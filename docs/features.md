# Application Features

AND Real Estate includes the following interactive capabilities:

### Public Catalog & Discovery
1. **Dynamic Catalog Grid**: Renders active real estate properties (Plots, Houses, Warehouses) with structural details (BHK sizes, bathrooms count, square footage) and preset preset galleries.
2. **Interactive Search & Filter**: Filters listings dynamically by location search strings, bedrooms (BHK count), property classifications, price brackets, and multi-option sorting.
3. **Collapsible Insights Dashboard**: A top-level panel showing database statistics: active listings count, average Plot prices, average House prices, and maximum land sq.ft sizes.
4. **Favorites Shortlisting**: Persistent bookmarking using client-side `localStorage`. Displays a shortlist badge counter in the top navigation bar and supports filterable shortcut toggles.

### Lead Generation & simulated chat
1. **Inquiry Submissions**: A contact form on the details page which saves customer info and messages directly to the database.
2. **Consultant Rajesh Kumar chatbot**: Submitting an inquiry opens a bottom-right floating conversation transcript that simulates walkthrough booking Slot slots.

### Management & Deployment
1. **Admin login dashboard**: Full CRUD operations for creating, updating, and removing listings.
2. **Cloudinary Service Fallback**: Uploads to Cloudinary, or falls back to base64 Data URIs during local development.
3. **Dual database dialect support**: Seamlessly runs on local async SQLite databases or production PostgreSQL.
