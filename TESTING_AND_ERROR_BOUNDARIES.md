# Granular Technical Documentation: Unit Testing & Error Boundaries

**Project:** CampusAI – AI-Based College Event Management System  
**Document Classification:** Software Quality Assurance (SQA) & Architectural Reliability Guide  
**Target Audience:** Academic Reviewers, Systems Architects, and Engineering Evaluators  

---

## 1. ARCHITECTURAL OVERVIEW OF FAULT CONTAINMENT

In complex single-page enterprise applications (SPAs) managing high-concurrency collegiate events, runtime exceptions in dynamic sub-trees (such as SVG analytics rendering, dynamic vector calculations, or corrupted browser cache) must **never compromise the availability of the broader system**. 

CampusAI adopts a **defense-in-depth reliability model** combining:
1. **Hierarchical React Error Boundaries** to contain component crashes.
2. **Deterministic Unit Test Suites** validating AI heuristic algorithms and registration transactions.
3. **State Resiliency Guardrails** preventing data corruption across asynchronous lifecycle events.

```
       +-------------------------------------------------------------+
       |               Root Level <ErrorBoundary>                    |
       |  (Catches unhandled errors; provides global recovery view)  |
       +-------------------------------------------------------------+
                                      |
       +------------------------------+------------------------------+
       |                                                             |
+-----------------------------+               +------------------------------+
|     <Navigation / Header>   |               |     Feature <ErrorBoundary>  |
|                             |               | (Isolates analytics/modals)  |
+-----------------------------+               +------------------------------+
                                                             |
                                              +------------------------------+
                                              | <AdminDashboard / Analytics> |
                                              | (Crash here won't crash Nav) |
                                              +------------------------------+
```

---

## 2. REACT ERROR BOUNDARIES SPECIFICATION

### 2.1 Lifecycle Implementation Mechanics
React Error Boundaries are specialized components that catch JavaScript runtime exceptions anywhere in their child component tree, log diagnostic information, and render a designated fallback UI instead of unmounting the complete component tree.

CampusAI implements this via [`src/components/ErrorBoundary.jsx`](./src/components/ErrorBoundary.jsx) utilizing two core React component lifecycle methods:

#### A. Static Phase: `static getDerivedStateFromError(error)`
- **Execution**: Triggered during the React "render" phase when a descendant component throws an error.
- **Contract**: Pure function; no side-effects allowed.
- **Purpose**: Immediately updates component state (`hasError: true`, `error`) to schedule a render pass with the fallback interface.

```javascript
static getDerivedStateFromError(error) {
  // Update state so the subsequent render cycle displays the fallback UI
  return { hasError: true, error };
}
```

#### B. Commit Phase: `componentDidCatch(error, errorInfo)`
- **Execution**: Triggered during the "commit" phase after the error has been caught.
- **Contract**: Side-effects permitted.
- **Purpose**: Dispatches structured telemetry payloads to monitoring pipelines (simulated or remote Sentry / Datadog agents) with complete component hierarchy traces.

```javascript
componentDidCatch(error, errorInfo) {
  this.setState({ errorInfo });
  console.group('🚨 [CampusAI ErrorBoundary Diagnostics]');
  console.error('Exception caught by ErrorBoundary:', error);
  console.error('Component Hierarchy Stack:', errorInfo?.componentStack);
  console.groupEnd();
  
  // Enterprise Integration Hook:
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, { extra: errorInfo });
  // }
}
```

### 2.2 Blast Radius & Tree Isolation Strategy
CampusAI prevents catastrophic UI degradation by segmenting boundaries into two operational tiers:
1. **Root-Level Boundary**: Encloses the entire application inside `App.jsx`, providing a fail-safe recovery screen equipped with:
   * **Component Re-Render Attempt (`handleReset`)**: Attempts to recover the tree without refreshing the document.
   * **Document Reload (`handleReload`)**: Reloads browser state cleanly.
   * **Session Storage Invalidation (`handleResetStorage`)**: Purges corrupted client-side state in `localStorage` while safely retaining institutional defaults.
2. **Sub-Tree Component Isolation**: Wrapping analytical charts (e.g., SVG capacity graphs in `AdminDashboard`) such that an analytical calculation fault isolates itself to the chart card, leaving event management tables and navigation fully operational.

### 2.3 Limitations & Out-of-Scope Exceptions
In accordance with React specification, Error Boundaries do **not** capture:
* **Event Handlers**: Addressed via traditional `try / catch` blocks within context mutation methods (`registerForEvent`, `createEvent`).
* **Asynchronous Code** (e.g., `setTimeout`, `requestAnimationFrame`): Handled via promise rejection wrappers.
* **Server-Side Rendering (SSR)**: Handled via Node.js cluster process supervisors.

---

## 3. UNIT TESTING ARCHITECTURE & TEST SUITES

The testing methodology in CampusAI follows the **F.I.R.S.T.** principle (Fast, Independent, Repeatable, Self-Validating, Timely).

### 3.1 Test Coverage Hierarchy Matrix

| Test Suite Target | Primary Module | Evaluation Scope | Target Pass Rate |
| :--- | :--- | :--- | :--- |
| **TS-01: AI Match Heuristics** | `EventContext.jsx` | Cosine bounds, skills overlap, dept bonus, explainable string | 100% |
| **TS-02: Registration Guard** | `EventContext.jsx` | Capacity bounds, double-registration rejection, seat counts | 100% |
| **TS-03: Cancellation Pipeline** | `EventContext.jsx` | Seat pool restitution, ticket invalidation | 100% |
| **TS-04: Ticket Cryptography** | `EventContext.jsx` | Regex conformance of generated alphanumeric passes | 100% |
| **TS-05: Error Boundary Fallback**| `ErrorBoundary.jsx`| Error catching contract, diagnostic stack extraction | 100% |

---

### 3.2 Granular Unit Test Specifications

#### Test Suite 1: AI Recommendation Engine (`aiRecommendation.test.js`)
* **Objective**: Verify that similarity calculations strictly adhere to the mathematical model $S(U_i, E_j) \in [50, 99]$ and generate verifiable natural language justifications.
* **Test Case UT-01 (Score Boundary Constraint)**:
  ```javascript
  it('should constrain match score between 50% and 99%', () => {
    const mockEvent = {
      skills: ['Python', 'Machine Learning'],
      department: 'Computer Science & Engineering',
      popularityScore: 95
    };
    const user = {
      interests: ['Python'],
      skills: ['Machine Learning'],
      department: 'Computer Science & Engineering'
    };
    const result = calculateAIMatch(mockEvent, user);
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThanOrEqual(99);
    expect(result.reasons.length).toBeGreaterThan(0);
  });
  ```
* **Test Case UT-02 (Department Alignment Affinity)**:
  ```javascript
  it('should grant positive delta for identical departmental taxonomy', () => {
    const eventDeptMatch = { skills: [], department: 'CSE' };
    const eventDeptDiff  = { skills: [], department: 'Civil Engineering' };
    const user = { interests: [], skills: [], department: 'CSE' };
    
    const scoreMatch = calculateAIMatch(eventDeptMatch, user).score;
    const scoreDiff  = calculateAIMatch(eventDeptDiff, user).score;
    expect(scoreMatch).toBeGreaterThan(scoreDiff);
  });
  ```

#### Test Suite 2: Registration Transaction Integrity (`registration.test.js`)
* **Objective**: Validate atomicity and boundary rules during attendee check-out.
* **Test Case UT-03 (Capacity Overflow Prevention)**:
  ```javascript
  it('should disallow registration when registeredCount equals maxParticipants', () => {
    const fullEvent = {
      id: 'evt-full',
      maxParticipants: 50,
      registeredCount: 50
    };
    const response = registerForEvent(fullEvent.id, { email: 'student@campus.edu' });
    expect(response.success).toBe(false);
    expect(response.message).toMatch(/full capacity/i);
  });
  ```
* **Test Case UT-04 (Duplicate Registration Guard)**:
  ```javascript
  it('should disallow duplicate registration for identical student ID or email', () => {
    registerForEvent('evt-101', { email: 'alex@campus.edu' });
    const duplicateAttempt = registerForEvent('evt-101', { email: 'alex@campus.edu' });
    expect(duplicateAttempt.success).toBe(false);
    expect(duplicateAttempt.message).toMatch(/already registered/i);
  });
  ```

#### Test Suite 3: Ticket ID Generation Grammar (`ticket.test.js`)
* **Objective**: Confirm that generated tickets comply with institutional verification scanners.
* **Test Case UT-05 (Alphanumeric Mask Validation)**:
  ```javascript
  it('should generate tickets matching PASS-[CATEGORY_CODE]-[4_DIGITS]', () => {
    const sampleCategory = 'Hackathon';
    const code = generateTicketCode(sampleCategory); // e.g., PASS-HAC-9281
    const regex = /^PASS-[A-Z]{3,4}-\d{4}$/;
    expect(regex.test(code)).toBe(true);
  });
  ```

---

## 4. IN-BROWSER HARNESS VS. CI/CD INTEGRATION

### 4.1 In-Browser Live Test Harness
For college project demonstrations and viva evaluations where reviewers require immediate visual validation, CampusAI incorporates an interactive test harness accessible via [`src/components/UnitTestRunnerModal.jsx`](./src/components/UnitTestRunnerModal.jsx).
* **Capabilities**:
  * Real-time execution of all 5 critical unit test specifications.
  * Live computation of statement, branch, function, and line coverage metrics.
  * Controlled **Fault Injection Button** that intentionally throws a render exception to visibly verify the Error Boundary isolating the crash without terminal access.

### 4.2 Automated CI/CD Execution Command
For standard command-line testing in continuous integration pipelines:
```bash
# Execute unit test suites via Vitest
npm test

# Execute test suite with coverage report generation
npm test -- --coverage
```
Target Quality Gate: **Min 85% Branch Coverage, 90% Statement Coverage**.
