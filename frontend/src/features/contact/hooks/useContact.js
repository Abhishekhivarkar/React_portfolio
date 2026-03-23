import { ContactContext } from "../contact.context";
import { useContext } from "react";
import { createContact } from "../services/contact.api";

export const useContact = () => {

  const context = useContext(ContactContext);
  const { loading, setLoading, data, setData } = context;

  const handleCreateContact = async ({ fullName, email, message }) => {

    try {

      setLoading(true);

      const res = await createContact({ fullName, email, message });

      if (res?.success) {
        setData(res);
      }

      return res;

    } catch (err) {
      console.log(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreateContact,
    loading,
    data
  };
};