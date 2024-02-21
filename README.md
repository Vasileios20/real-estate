# CB Real Estate

![Home Page](documentation/features/Home.png)

CB Real Estate represents the culmination of my efforts during the final project for Code Institute, serving as a dynamic platform designed for further development and potential client adoption. Focused on real estate, the site empowers users to effortlessly search for their next home, office space, or the ideal plot of land for construction. The inclusion of user accounts allows individuals to curate a personalized wishlist, tracking properties of interest, and facilitating seamless communication through a user-friendly contact form. Currently, property uploads are restricted to administrators, ensuring quality control, but the future vision includes the possibility for registered agents to contribute their listings. As the project evolves, CB Real Estate aims to provide an enriched and intuitive platform for users to explore and engage with the real estate market.

Deployed API Heroku: [API link](https://re-drf-api-f69fb4705742.herokuapp.com/)

Deployed Frontend Heroku: [CB Real Estate](https://re-real-estate-ecc213881132.herokuapp.com/)

Backend Github [Repository](https://github.com/Vasileios20/drf-real-estate)

Frontend Github [Repository](https://github.com/Vasileios20/real-estate)

![GitHub contributors](https://img.shields.io/badge/CONTRIBUTORS-1-<RED>)



## Design

### Colour Scheme

![Colout pallete](/documentation/CB.png)

The main 2 colours (#b0b000 and #606000) have been chosen to match the logo.

### Typography

The font [Montserrat](https://fonts.google.com/specimen/Montserrat)
has been chose be chosen, because of its clean and modern appearance,
its readability and it's a web friendly font.

### Wireframes

#### Desktop

[Home Page](/documentation/wireframes/Home_Page.png)

[About Page](/documentation/wireframes/About_Page.png)

[Contact page](/documentation/wireframes/Contact_Form.png)

[Add Listing](/documentation/wireframes/Listing_Add.png)

[Edit Listing](/documentation/wireframes/Listing_Edit.png)

[Listing Page Content](/documentation/wireframes/Listing_Page_Content.png)

[Listing Page Images](/documentation/wireframes/Listing_Page_Images.png/)

[Listings](/documentation/wireframes/Listing_results_Page.png/)

[Wishlist](/documentation/wireframes/Wishlist_Page.png)

[Messages Page](/documentation/wireframes/Messages.png)

[Message Page](/documentation/wireframes/Message.png)

[Sign in](/documentation/wireframes/Sign_in.png)

[Signup](/documentation/wireframes/Sign_Up.png)

#### Mobile

[Home Page](/documentation/wireframes/Mobile_Home.png)

[About Page](/documentation/wireframes/Mobile%20_About.png)

[Contact page](/documentation/wireframes/Mobile_Contact.png)

[Add Listing](/documentation/wireframes/Mobile_Listing_Add.png)

[Edit Listing](/documentation/wireframes/Mobile_Listing_Edit.png)

[Listing Page Content](/documentation/wireframes/Mobile_Listing_Page.png)

[Listings](/documentation/wireframes/Mobile_Listings.png)

[Wishlist](/documentation/wireframes/Mobile_Wishlist.png)

[Messages Page](/documentation/wireframes/Mobile_Messages.png)

[Sign in](/documentation/wireframes/Mobile_Sign_in.png)

[Sign up](/documentation/wireframes/Mobile_Sign_up.png)

## User Experience (UX)

### Site Purpose

The primary purpose of CB Real Estate is to provide a comprehensive and user-friendly online platform for individuals seeking real estate opportunities. Whether users are looking for a new residence, office space, or land for development, the site aims to facilitate a seamless and efficient search experience.

### Site Goal

CB Real Estate strives to become a go-to destination for real estate exploration, connecting users with their ideal properties. The overarching goal is to establish a reliable and engaging platform that not only meets current user needs but also anticipates and adapts to evolving real estate trends.

### Audience

The target audience for CB Real Estate includes individuals in search of residential properties, commercial spaces, and land for development. Additionally, the site caters to registered users interested in building personalized wishlists, fostering engagement and loyalty.

### Communication

The site communicates property listings, features, and functionalities clearly and concisely to users. Through an intuitive interface, CB Real Estate aims to convey information effectively, ensuring a positive and informative user experience. Regular updates and notifications contribute to ongoing communication with users.

### Current User Goals

Existing users on CB Real Estate aspire to efficiently search and find properties that align with their needs. They also seek to manage and curate personalized wishlists, making the platform a valuable tool in their real estate journey. Clear communication channels, such as the contact form, facilitate inquiries and engagement.

### New User Goals

New users are expected to explore the site with ease, understanding its features and functionalities. Their primary goals include discovering available properties, understanding the wishlist feature, and initiating communication through the contact form. A seamless onboarding process is crucial to ensure positive initial interactions.

### Future Goals

CB Real Estate's future goals include expanding its user base by potentially allowing agents to register and contribute property listings. The site aims to enhance its functionality to accommodate a broader range of real estate needs and evolving market demands. Continued improvements in user experience and feature development are key aspects of the platform's ongoing evolution.

## User Stories

I have included links to the [GitHub Issues](https://github.com/Vasileios20/real-estate/issues) for this project, as well as the [KANBAN board](https://github.com/users/Vasileios20/projects/6).

## Features

All pages on the site are responsive and have :

* ### Navigation Bar

Site user [navbar](/documentation/features/Navbar.png) contains the logo (acts as home button), Home, About, Contact us,
Listings, Sign in and Sign up

#### Navigation Bar (logged in)

Registered user [navbar](/documentation/features/Navbar(logged%20in).png) contains the logo (acts as home button), Home, About, Top 15 Movies, Logout and the searh form.

#### Navigation Bar (Admin user)

Admin user [navbar](/documentation/features/Navbar(Admin).png)

* [Favicon](/documentation/features/favicon.png)

### Footer

The [Footer](/documentation/features/Footer.png) displays links for the About us, Contact and Listings. It also displays Github and Linkedin icons.

### Home Page

The [Home Page](/documentation/features/Home_Page.png) displays the top 3 rated movies.

### About Page

The [About Page](/documentation/features/About_Page.png) gives information about the website.

### Contact Page

The [Contact Page](/documentation/features/Contact_us_Page.png) contains a contact form.

### Listings Page

The [Listings Page](/documentation/features/Listings_Page.png) displays the listings in a container with infinite scroll.

### Listing Page

  The Listing Page displays the listing's images [on top of the page](/documentation/features/Listing_Page(1).png) and the
  [listing's features bellow](/documentation/features/Listing_Page(2).png)
  
#### Images Modal

  When click on an image, the [modal](/documentation/features/Images_modal.png) will pop up and display all the images

### Add Listing Page

  The Add Listing Page ([1](/documentation/features/Add_listing(1).png), [2](/documentation/features/Add_listing(2).png),
  [3](/documentation/features/Add_listing(3).png)) contains a form with fields to upload images, type, sale_type, description,
  address_number,address_street, postcode, city, price, surface, levels, bedrooms, floor, kitchens, bathrooms,
  living_rooms, heating_system, energy_class, construction_year, availability

### Edit Listing Page

  The [Edit Listing Page](/documentation/features/Listing_Edit.png) contains the existed images with a checkbox next to eac and all fields
  from the Add Listing Page filled with the existed values

### Messages Page

  The [Messages Page](/documentation/features/Messages_Page.png) displays a search bar that has fields for query (name, email, subject) and
  a list of the message in a container with infinite scroll.
  
#### Message page

  The [Message Page](/documentation/features/Message_Page.png) displays the message in a card with the fields of name, email, subject and
    message

### Sign in Page

The [Sign in Page](/documentation/features/Sign_in.png) displays the Sign in form, an image on the right and a link to sign up page

### Sign up Page

The [Signup Page](/documentation/features/Sign_up.png) displays the sign up form, an image on the rigt and a link to sign in page.

### Wishlist Page

Only registered users can visit the wishlist page.

The [Wishlist Page](/documentation/features/Wishlist_Page.png) displays a list of user's list of properties added.

### Profile Page

The [Profile Page](/documentation/features/Profile_Page.png) displays the user's details and a carret down icon to open the [dropdown menu](/documentation/features/Profile_dropdown.png)
that display icons to [edit profile](/documentation/features/Profile_Edit.png), [change username](/documentation/features/Change_username.png) and [changee password](/documentation/features/Change_password.png)

#### Edit Profile Page

The [Edit Profile](/documentation/features/Profile_Edit.png) displays a form to update the image, the first name, the last name, the email address and the phone number.

#### Change Username Page

The [Change username Page](/documentation/features/Change_username.png) displays a form to udpate the username.

#### Change Password Page

The [Change password Page](/documentation/features/Change_password.png) displays a form with 2 fields (new password and confirm password).

### 403 error page

The [403 page](/documentation/features/403.png) displays an image with a text error 403: Forbidden.

### 404 error page

The [404 page](/documentation/features/404.png) displays an image with a text error 404: Not found.

## Reusable Components

[SearchBar.js](/documentation/features/Searchbar.png) that exists in the home page, the about page, the listings page and
if logged in user, in the wishlist page.

Dropdown menu: exists in the [Listing.js](/documentation/features/DropdownMenu.png) (only for admins) and in the [ProfilePage.js](/documentation/features/DropdownMenuProfile.png)

ListingFormTextFields.js: displays the input fields for the ListingCreateForm and ListingEditForm.

ListingHeader.js: displays basic info for a property(listing) and it exists in the Listing, ListingsWishlistPage.

ListingsWishlistPage.js : to display all the listings, results of listings after a search and the user's wishlist

axiosDefault.js : for ease of communication with the backend API.

Asset.js : to supply the loading spinner & user avatar throughout the site.

CurrentUserContext.js : confirm users logged-in status to determine what functionality is available to that user.

useRedirect.js : redirects a user to another page if they are not authorised to be on the page they are trying to access.

utils.js : supplies functionality to all of the components that utilise the Infinite Scroll.

ScrolltoTop.js: scrolls the page to top when user change page.

useFetchListings.js: to fetch listings from the API

useFetchWishlist.js: to fetch user's wishlist from the API

useUserStatus.js: to get user status to determine what functionality is available to that user.

## Technologies Used

### Languages Used

HTML, CSS, JS

### Frameworks, Libraries & Programs Used

* [React](https://legacy.reactjs.org/docs/getting-started.html) Javascript library for building the component based UI and avoiding having to refresh to display dynamic content
* [ESLint](https://eslint.org/) Linter for error checking and syntax analysis
* [React Bootstrap](https://react-bootstrap-v4.netlify.app/) CSS framework for styled components
* [Axios](https://axios-http.com/) Promise based http client for making http requests to the backend API
* [React Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component) Used to easily load extra content rather than paginating pages, for a better UX
* [React Router](https://v5.reactrouter.com/web/guides/quick-start) Used to dynamically load pages and aid site navigation for the user.
* [jwt-decode](https://www.npmjs.com/package/jwt-decode) A browser library that helps decoding JWT's token
* [Cloudinary](https://cloudinary.com/) - To host images

#### Programs Used

* [GitHub](https://github.com/) - To save and store files for the website.
* [VSCode](https://code.visualstudio.com/) - Code editor used for local development.
* [GitPod](https://gitpod.io/) - IDE used to create the site.
* [Balsamiq](https://balsamiq.com/) - Used to create wireframes.
* [Techsini](https://techsini.com/multi-mockup/index.php) - To display the web image in various devices.
* [Google Developer Tools](https://developer.chrome.com/docs/) - To test features, resposiveness and stylilng.
* [TinyPNG](https://tinypng.com/) - To reduce size of the images.
* [Favicon](https://favicon.io/) - To create favicon.
* [Shields IO](https://shields.io/) - To add badges to README.
* [Obsidian](https://code.visualstudio.com/) - To keep notes.
* [Coolors](https://coolors.co/) - To create palette image to README.
* [Canva](https://www.canva.com/) - To create the logo



## Testing

Please see [Testing](TESTING.md)

