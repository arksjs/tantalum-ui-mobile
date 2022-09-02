import { multiWithInstall } from '../helpers/with-install'
import Form from './Form.vue'
import FormFooter from './FormFooter.vue'
import FormItem from './FormItem.vue'

export { Form, FormItem, FormFooter }
export default Form
export const install = multiWithInstall(Form, [FormItem, FormFooter])
