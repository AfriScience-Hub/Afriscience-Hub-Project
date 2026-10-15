# Admin Competitions — Implementation Notes

## ⚠️ Judge visibility rules (for when judge functionality is implemented)

The following elements are **admin/organizer-only** and must NOT be visible to
judges when the judge role is built (blind scoring):

| Element | Where it lives today |
| --- | --- |
| **Release Top 30** button | View Submissions page header (`SubmissionsHeader`) |
| **Average Score** column | View Submissions table (`SubmissionsTable`) |
| **Scored By** column | View Submissions table (`SubmissionsTable`) |
| **Status** column (Scored / Pending) | View Submissions table (`SubmissionsTable`) |
| **Participant name** under the submission title | View Submissions table → Submission column (the small name below the bold title) |

### Checklist for the judge-facing view

- [ ] Hide the Release Top 30 action (shortlist release is an organizer decision).
- [ ] Hide Average Score, Scored By and Status columns.
- [ ] Show only the submission title in the Submission column — never the participant's name (scores must be blind).
- [ ] Judges should only see what they need to score: the submission itself, the scoring sheet, and their own score.
- [ ] Judges must NOT see other judges' scores, totals across judges, or rankings.
