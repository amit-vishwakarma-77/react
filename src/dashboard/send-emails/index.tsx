import { useLocation } from 'react-router-dom';
import Template1 from '../../templates/template1';
import Template2 from '../../templates/template2';
import Template3 from '../../templates/template3';

function SendEmail(props: any) {
  const { state } = useLocation();
  const { contacts, template } = state; // Read values passed on state

  return (
    <>
      {contacts.map((contact: any) => {
        return (
          <>
            {template === 'Template1' ? (
              <Template1
                {...{ name: contact.first_name, lastName: contact.last_name }}
              />
            ) : template === 'Template2' ? (
              <Template2
                {...{ name: contact.first_name, lastName: contact.last_name }}
              />
            ) : template === 'Template3' ? (
              <Template3
                {...{ name: contact.first_name, lastName: contact.last_name }}
              />
            ) : (
              ''
            )}
          </>
        );
      })}
    </>
  );
}

export default SendEmail;
