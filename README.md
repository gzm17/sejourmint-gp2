# Getting Started with Create React App
# Structure of the site
This project was based on create-react-app template.
The files follow the following structure:
| index.js                      //sets the body params in index.css including background color
    | app.js                    //passthru - it has not function other than starting Main.js
        | main.js               //The main navigation/integration component. All other components enemate from here
            | Header.js         //homegrown nav bar with desired features
            | footer.js         //homegrown footer nav bar
            | PhotoFrame.js     //used as the basic component other sections which contain photos use (features, rooms, etc.)
            | SectionTitle.js   //defines the sectiontile and image

All *.js files have corresponding *.css with the same name. 
All files other than index.js/css and App.js/css are in src/components directory

All image files are in public/assets/images directory.

Major Items to be done:
1) Language selection - done
    Problem remains: in rendering the footer in small screen. When clicking booking going home, transparency of footer.bg becomes transparent. Only upon scroll does it change to opague. Shoulld be opact all the time in small screen. Probably need to separate var to keep state.

    Also: inserting a button into the menu (both footer and header) seems to have messed up css. Had to do manual adjustment to put the symbols in the center. Background color in footer blocks does not show. 

2) Credit card validation and transaction support APIs
3) user booking and room models
4) admin module
5) videos selection
6) user info extraction infrastructure (capture device ids, visits, ip_addresses, etc.)
７）Season based adjustment
8) Security




Items to be fixed:
1) Booking background color in header and word Booking not in synch - done
2) after click the bottom arrow to return to top page, arrow should dissappear (it does if one starts scroll) - done
3) bottom boxes height is not 90px. do not know why? - done

4) header background - change color when gallery is chosen
5) How to center gallery menu items - done
6) In consistency in applying css - some do not work as intended - in Gallery.css, font-color for 'Gallery', etc. - done. Forgot to import css file 
7) HashLink (from gallery page, click to Main page scroll to id) and bottom arrow (refresh page top of Main) stppped working in chrome but works in safari - memory problem? (???)
8) GalleryFrame only works the first time it renders, subsequent clicks fail rendering - done, prepending '/' to imgage url -> '/assets/images/...' - very strange 
9) In slide presentation mode, how to use use height as first priority and adjust width? 
10) Gallery menu default selection not highlighted upon entering
11) How to read photos directly from /assets/images folder without supplying a .js file with image names? 
12) how to stype <Link>: className nor Id works: in SelectDate.js
13) setCheckinDate gets a not a function error, but checkinDate.setDate works. Conflict with state var declaration?
14) in bookingHeader: under small screen, when vstep < currentstep, ok. But when moving back, vstep === cstep, the small screen top bar is orange, but should be black. 


Questions:
1) import logo from 'assets/...' cannot resolve but in <img src='same path' /> is ok. Why? SectionTitle.js
2) <a> does not jump to id set in custom component, but in div ok. SectionTitle.js 
3) How to prevent from reading the code from user pc?
4) When setState is an object (booking in app.js), each time if supplied partial info from def, then using setState(booking) seems to work with each time adding values. The correct way is probably
setState(prev => ({...prev, a: 1, b:2})). The problem is that then different updates can nolonger use the same function ---> 
x = {a:1, b:2, c:3}; y = {...x, c:50}; y = {a:1, b:2, c: 50}. This code is correct. Corrected codes. 


Known bugs:
1) in booking menu, after clicking collapse the menu and then change screen size, the large screen effect does not happen
 Forever reason, the parameters upon the last click persists despite the large / small screen set up in css.
 window.innerWidth > 768 {...} does not respond either (react does not re-render upon size change). 
 Another way would be using state, as shown below (to try next) -
 https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
2) Calendar title (Month Year) does not show up in SelectDates. css conflict? if so where? not in react-calendar



Last before going to JP:
working on SelectRoomTypes.js component. RoomTypes.js' two exports are half done. 
Trying to figure out how to use PhotoFrameMany component but with the font dard. Maybe using data-* attributes as a method. Do not know yet. 
https://www.w3schools.com/tags/att_data-.asp


## Hosting
# Making it work in gh-pages:

Two main problems: 
0) Customization to work with gh-pages
1) Images rendering
2) Client site routing

For 0), This is resolved using the process laid out in the repo: https://github.com/gitname/react-gh-pages 

For 1) Initially, all images failed to render - reason being that the deployment build and development have different file folder structure. to accommodate gh-pages, create-react-app documentation has reasonably detailed instruction on various aspects https://create-react-app.dev/docs/deployment/#github-pages 

Mainly below: 
- Use import images instead of /assets/images/...
- When there are many files, to do dynamic imports using js would be too complicated, instead, use create-react-app's PUBLIC_URL enviromental var in front of the file path, for example process.env.PUBLIC_URL+image.image in GalleryPhotoFrame.js
- For svg files, using the method mentioned in create-react-app did not work. Instead, converted svg files to png files, then usine one of the above two ways. Worked.

For 2), used the template provided in https://github.com/rafgraph/spa-github-pages/tree/gh-pages. Works perfectly upon the first try. It also fixed a problem that opening page did not show (probably due to adding baserouter='/seourmint-gp2' in <BrowserRouter> in App.js file).

