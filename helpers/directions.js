'use strict'


/**
 * Directions to search on matrix
 *
 * @type Json
 */
module.exports.directions = {

    // Right direction
    'right' : {
        'col'   : 1,
        'row'   : 0
    },

    // Right oblique down direction
    'right-oblique-down' : {
        'col'   : 1,
        'row'   : 1
    },

    // Down direction
    'down' : {
        'col'   : 0,
        'row'   : 1
    },

    // Left oblique down direction
    'left-oblique-down' : {
        'col'   : -1,
        'row'   : 1
    },

};

