# Librarian Non-Technical Handbook — PM SHRI KV Raigarh Library

Welcome! You do **not** need to write any code to run the Vidyalaya Library website. Everything is managed from the **Librarian Admin Dashboard** (`/admin`).

---

## 1. Logging In & Out
1. Open your library website and click **Librarian Admin** in the top-right navigation bar (or visit `/admin`).
2. Enter your staff email and password (or click **Send Magic Link** to receive a one-click sign-in link in your inbox).
3. For security, the dashboard automatically logs you out after **30 minutes of inactivity**. Always click **Log Out** when using a shared school computer.

---

## 2. Updating School Info & `[PLACEHOLDERS]`
1. Click the **Site Settings & Audit** tab.
2. Fill in the official **Librarian Name**, **Library Opening Hours**, **School Address**, **Library Email**, **Borrowing Guidelines**, and **Collection Size**.
3. Click **Save Site Settings**. The Homepage, About page, Services page and Footer update immediately.

---

## 3. Writing, Scheduling & Publishing a Blog Post
1. Go to the **Blog** tab and click **Write New Post**.
2. Enter a clear **Title** (the web address slug fills automatically).
3. Choose a **Category** (e.g., *Library News*, *Book Reviews*, *Reading Challenges*) and write a short 1–2 sentence **Excerpt**.
4. Write the article body. Simple formatting tips:
   - `## Heading` creates a section heading (and automatically appears in the article Table of Contents!).
   - `**bold words**` makes text **bold**.
   - `- item` creates a bullet list.
5. Click **Live Preview** anytime to see how students will read it.
6. Upload a picture (the website automatically compresses it for fast 4G loading) and write a clear **Image Alt Text** describing the picture for visually impaired readers.
7. Set **Publish Status**:
   - **Draft:** Saved privately while you finish writing.
   - **Scheduled:** Automatically becomes visible to students at the **Publish Date & Time** you choose.
   - **Published:** Live immediately.
8. Click **Save Post**.

---

## 4. Adding Books & Choosing "Book of the Month"
1. Go to the **Books** tab and click **Add Book** (or **Import CSV** to upload many books from Excel/Google Sheets using headers `title,author,genre,language,grade_band,description`).
2. Tick **Set as Book of the Month** and fill in **Why We Recommend It** to spotlight that book in the navy hero card on the Homepage.
3. Keep **Availability** as *Unknown (Hidden)* unless you actively update issue/return status on the site.

---

## 5. Adding Library Events
1. Go to **Events & Resources** and fill out **Add New Event** (e.g. *Vidyalaya Reading Week*).
2. Leave **Registration URL** blank unless there is an official school registration form; the "Register Online" button only appears when a URL is provided.
3. Students and parents can download any event straight into Google/Apple/Outlook Calendar via the `.ics` button.

---

## 6. Approving Student Submissions (Safeguarding Dos & Don'ts)
Every student book review or poem stays **hidden** until you approve it in **Moderation & Inbox**.

### Safeguarding DOs
- **DO** check for yellow **Automated Safeguarding Flags** (which warn if a student accidentally typed a phone number, email, home address, or full name + class & section).
- **DO** use anonymous display labels such as *"A Class VII reader"* or *"A Class V poet"*.
- **DO** ensure parental/guardian consent is recorded before uploading any event photo showing identifiable students.

### Safeguarding DON'Ts
- **DON'T** publish student phone numbers, emails, home addresses, Aadhaar/admission numbers, or identifiable student photos without written consent.
- **DON'T** delete real student work lightly — reject or edit out accidental personal details first.

---

## 7. Changing the Top Announcement Bar
1. Go to **Moderation & Inbox** → **Announcement Bar Manager**.
2. Type a short message (e.g. *"National Library Week starts Monday!"*), optional link (`/events`), and optional expiry date.
3. Use **Turn Off / Turn On** anytime to toggle the banner.

---

## 8. Removing Sample Demo Data Before Launch
1. Go to the **Overview** tab.
2. Once you have added real Vidyalaya content, click **Remove All Sample Content** to clear all seeded sample posts, books, events and student spotlight cards in one step.
