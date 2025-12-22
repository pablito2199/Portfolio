import emailjs from 'emailjs-com';
import {FC, memo, useCallback, useMemo, useState} from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;

      setData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    },
    [],
  );

  const handleSendMessage = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    emailjs.sendForm('service_ifxis44', 'template_97ud84q', event.currentTarget, 'z7lrWEIQz9Ydo1DGl').then(() => {
      alert('Mensaje enviado correctamente.');
    });
  }, []);

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={handleSendMessage}>
      <input
        className={inputClasses}
        id="nombre"
        name="nombre"
        onChange={onChange}
        placeholder="Nombre"
        required
        type="text"
      />
      <input
        autoComplete="email"
        className={inputClasses}
        id="email"
        name="email"
        onChange={onChange}
        placeholder="Email"
        required
        type="email"
      />
      <textarea
        className={inputClasses}
        id="mensaje"
        maxLength={250}
        name="mensaje"
        onChange={onChange}
        placeholder="Mensaje"
        required
        rows={6}
      />
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-green-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-stone-800"
        type="submit">
        Enviar mensaje
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
