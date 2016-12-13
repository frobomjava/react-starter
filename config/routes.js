/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'home' },

  'get /signup': { view: 'signup' },

  'post /signup': 'UserController.signup',

  'get /signin': { view: 'signin' },

  'post /signin': 'UserController.signin',

  'get /:userName/signout' : 'UserController.signout',

  'get /project/socket/join': 'ProjectController.socketJoin',

  /*'get /:userName/projects/new': 'ProjectController.indexCheck',*/

  'post /:userName/projects/new': 'ProjectController.create',

  'get /:userName/projects': 'ProjectController.getAllProjects',

  //'get /:userName/projects/in/:projectId': 'DtFileController.getAllFiles',
  'get /:userName/projects/in/:projectName': 'DtFileController.getAllFiles',

  //'post /:userName/projects/in/:projectId/files/new': 'DtFileController.create',
  'post /:userName/projects/in/:projectName/files/new': 'DtFileController.create',

  'get /file/socket/join': 'DtFileController.socketJoin',

  'get /:userName/projects/in/:projectName/files/get/:fileName': 'DtFileController.loadFile'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
