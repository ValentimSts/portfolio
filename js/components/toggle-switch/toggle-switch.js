/**
 * @fileoverview Toggle switch component for the portfolio website
 * @author ValentimSts
 * @since 0.0.0
 */

import { CLASSES } from '../../constants/classes.js';

/**
 * Creates a toggle switch element
 * @function createToggleSwitch
 * @param {Object} options - Configuration options for the toggle switch
 * @param {string} options.id - The unique ID for the toggle input
 * @param {boolean} [options.checked=false] - Initial checked state
 * @param {Function} [options.onChange] - Callback function when toggle changes
 * @param {string} [options.ariaLabel] - Accessible label for the toggle
 * @returns {HTMLLabelElement} The toggle switch element
 * @example
 * const toggle = createToggleSwitch({
 *   id: 'dark-mode-toggle',
 *   checked: true,
 *   onChange: (isChecked) => console.log('Toggle:', isChecked),
 *   ariaLabel: 'Enable dark mode'
 * });
 */
export function createToggleSwitch({ id, checked = false, onChange, ariaLabel }) {
  const label = document.createElement('label');
  label.className = CLASSES.TOGGLE_SWITCH;

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.className = CLASSES.TOGGLE_SWITCH_INPUT;
  input.id = id;
  input.checked = checked;
  
  if (ariaLabel) {
    input.setAttribute('aria-label', ariaLabel);
  }

  if (onChange) {
    input.addEventListener('change', (e) => onChange(e.target.checked));
  }

  const slider = document.createElement('span');
  slider.className = CLASSES.TOGGLE_SWITCH_SLIDER;

  label.appendChild(input);
  label.appendChild(slider);

  return label;
}

/**
 * Gets the current state of a toggle switch by ID
 * @function getToggleState
 * @param {string} id - The ID of the toggle input
 * @returns {boolean|null} The checked state, or null if not found
 */
export function getToggleState(id) {
  const input = document.getElementById(id);
  return input ? input.checked : null;
}

/**
 * Sets the state of a toggle switch by ID
 * @function setToggleState
 * @param {string} id - The ID of the toggle input
 * @param {boolean} checked - The new checked state
 * @param {boolean} [triggerChange=false] - Whether to trigger the change event
 */
export function setToggleState(id, checked, triggerChange = false) {
  const input = document.getElementById(id);
  if (input) {
    input.checked = checked;
    if (triggerChange) {
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}
