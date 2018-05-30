import { rankWith, scopeEndsWith } from '@mobx-jsonforms/core';

export default rankWith(Number.MAX_VALUE, scopeEndsWith('rating'));
