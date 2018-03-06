
const CONTAINER_CLASS_NAME = 'spinning-preloader-container';
const COMPLETE_CLASS_NAME = 'complete';
const CONTAINER_QUERY = `.${CONTAINER_CLASS_NAME}`;

const CONTAINER_NAME: string = CONTAINER_CLASS_NAME.split('-').join(' ');

export const TYPE_ERROR_CONTAINER_WAS_NOT_FOUND_MESSAGE =
  `The ${CONTAINER_NAME} was not found`;

export const EMULATE_ELEMENT_NAME = 'div';

export {
  CONTAINER_QUERY,
  COMPLETE_CLASS_NAME,
  CONTAINER_CLASS_NAME,
  CONTAINER_NAME
}
