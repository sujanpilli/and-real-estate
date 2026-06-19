# Application Pages & Routes

AND Real Estate is organized into the following public and administrative routes:

### Public Views
- **Home (`/`)**: Displays introductory brand statements, handpicked featured listings, and grid outlines of real estate services.
- **Properties Catalog (`/properties`)**: Main search portal housing search inputs, collapsible insights statistics, and listing cards grid.
- **Property Details (`/properties/:id`)**: Renders detailed descriptions, floor specs, slide image galleries, instant contact channels, and the floating Agent Chat consultant widget.
- **Services (`/services`)**: Information pages regarding construction assistance, loan processing support, warehouse leasing, and sales support.
- **Contact (`/contact`)**: General inquiry forms for non-property questions.

### Administrative Console
- **Admin Login (`/admin/login`)**: Secure JWT credential input panel.
- **Properties Index (`/admin/properties`)**: Table view summarizing listings, types, prices, and status indicators (Sold, Featured, Active) with delete/edit shortcuts.
- **Add Property (`/admin/properties/new`)**: Interactive forms matching the listing validation schemas.
- **Edit Property (`/admin/properties/edit/:id`)**: Form editing and serial image dropzone.
