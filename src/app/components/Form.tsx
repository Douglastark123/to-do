import { ActionProps } from '../page'
import MyModal from './MyModal'

const Form = ({ action }: { action: ActionProps }) => {
  return (
    <MyModal isOpen={action.isFormOpen}>
      <form>
        <fieldset className="flex">
          <legend>{action.name === 'add' ? 'Add' : 'Edit'} task</legend>
          <span>
            <input type="text" />
            <button>+</button>
          </span>
        </fieldset>
      </form>
    </MyModal>
  )
}

export default Form
