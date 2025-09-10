// Widget and Category interfaces converted to JSDoc comments for documentation

/**
 * @typedef {Object} Widget
 * @property {string} id
 * @property {string} type
 * @property {string} title
 * @property {string} category
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {Widget[]} widgets
 */

/**
 * @typedef {Object} DashboardData
 * @property {Category[]} categories
 */

export {};