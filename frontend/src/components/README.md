
# Components

Contains basic reusable components for the web app.

## Directory Guildlines

### Structure

Components are grouped based on the function they play in the application's interface.

The application can be divided into the following structural functions (in order of priority):

* Recipe Manipulation - facilitating the addition, delection or modification of recipes.
* Recipe Discovery - searching or browsing recipes.
* Recipe Display - viewing detailed information about a recipe.
* Communication - showing an error or message about an action, wrappers for clerk authentication components.
* Navigation - moving/routing through the appliction.

Each of these functions have corresponding folders in the directory and components are placed in a folder according to the primary fuctionality they facilitate. In the rare case that a component facilitates multiple functions it is placed in a folder based on the order of priority above (e.g. a component doing manipulation and navigation is placed in the manipulation folder).

#### Sub Components

Some components require sub-components (primarily for code readibilty). In such a case, that component is contained in its own folder (within its functionality folder) and all its sub-components are prefixed with a '_'. 

The name of the component's folder and main JSX file is the same.

### Format

* Each component is created in the '.jsx' format only.
* Each component file starts with a comment describing its purpose.

