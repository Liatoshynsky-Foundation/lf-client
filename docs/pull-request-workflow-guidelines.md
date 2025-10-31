# Pull Request Workflow Guidelines

This document describes the required steps and checks for creating Pull Requests in the project.  
Following these rules helps maintain code quality, consistency, and smooth collaboration between developers.

---

## Before Creating a Pull Request

- Run the **linter** and fix all reported issues.
- Check the **browser console** for any errors or warnings.
- Make sure all **unit** and **end-to-end (e2e)** tests have passed locally.

---

## While Creating a Pull Request

- The PR **title must follow the [Conventional Commits](./conventional-commits.md)** standard.
- Add a clear **description**, screenshots, or video (for UI-related changes).
- Add yourself as an **Assignee**.
- Add all necessary **labels**.
- Link the PR to the related **issue**.
- Move the issue to the **Ready for review** column on the board.
- Add **at least three reviewers**, but only after all automated checks have passed.
- Post a message in the team chat announcing that the PR is ready for review.

---

## During Review

- Respond to **all reviewer comments** and make changes if needed.
- Do **not** click **“Resolve Conversation”** — the reviewer who opened the comment should resolve it.
- After making changes, push the updates and **request re-review**.
- Verify that the **SonarQube** report shows no new issues.

---

## Before Merge

- Ensure the PR has the **required number of approvals**.
- Confirm that all **GitHub automated checks and tests** have successfully passed.
- Use the **“Squash and merge”** option when merging.
