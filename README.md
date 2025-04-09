Digital Footprint tracker


## How to run locally
Designed to be maximally easily
Inside of Backend directory make sur you have a .env file that defines th following: SERP_API_KEY and, SECRET_KEY (this will be secret for Flask app)
Inside of Backend directory run "python app.py", and... that's it!
Requires the requirements.txt file to be pip installed.
Note that person-search react-subfolder does not contain the node_modules folder to avoid bloating the repo


## 🚧 Future Work

This project is still in active development. Below are some key areas planned for future enhancement:

---

### 🌐 Deployment & Hosting

- [ ] **Prepare for Official Deployment**
  - Configure proper CORS handling.
  - Enforce HTTPS.
---

### 📝 Logging & Monitoring

- [ ] **Request Logging**
  - Log incoming requests to a file (not console).
  - Exclude response bodies from logs for security and privacy.
  - Logging of IP addresses is being considered, but excluded for now to ensure privacy.

---

### 🔒 Abuse Prevention & User Safety

- [ ] **Enforce Single-Person Search**
  - Prevent multi-person search queries to ensure intended use (e.g., personal audits).
  - Possibly rate-limit based on unique search parameters.
  - Allow re-searching the same name without contributing to the strict rate-limit.

- [ ] **Implement Global Rate Limiting**
  - Apply a global cap on total usage across users.
  - If exceeded, display:  
    `"Due to high demand, this feature is temporarily unavailable."`

---

### 🧠 Smarter Query Handling

- [ ] **Improve Name Matching**
  - Support middle names and flexible name formats.
  - Run both strict (`"First Last"`) and relaxed (`First [Middle] Last`) queries.
  - Redesign scoring system:
    - Each part of the name could be worth 5/10 points.
    - Full name matches could score 100.
    - Consider non-linear scoring (e.g., 2/4 vs 3/4 match is significantly stronger).

- [ ] **Redesign Optional Info Feature**
  - Define whether optional info should filter results or expand them.
  - Determine its role in relevance scoring and search behavior.
  - Clarify the feature’s intent and usage in the UI.

---

### 🤖 LLM Integration

- [ ] **AI-Powered Summary Generation**
  - Use an LLM to generate a cohesive summary of all results.
  - Carefully craft prompts for clarity, relevance, and tone.
  - Ensure GDPR compliance:
    - Replace all instances of `{name}`, first name, and last name with `"Person"` during requests.
    - Restore the name(s) in the final output.
  - Update the Privacy Policy to reflect any LLM-based processing.

---
