import { useState } from "react";
import { useContact } from "../features/contact/hooks/useContact";
import Alert from "../Components/Alert";
import { Particles } from "../Components/Particles";

const Contact = () => {

  const { handleCreateContact, loading } = useContact();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.message.trim().length < 10) {
    showAlertMessage("danger", "Message must be at least 10 characters long");
    return;
  }

  const res = await handleCreateContact(formData);

  if (res?.success) {
    showAlertMessage("success", res.message);
    setFormData({
      fullName: "",
      email: "",
      message: ""
    });
  } else {
    showAlertMessage("danger", "Something went wrong!");
  }
};

  return (
    <section className="relative flex items-center c-space">

      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      {showAlert && <Alert type={alertType} text={alertMessage} />}

      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">

        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to build a new website or improve an existing platform.
          </p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>

          <div className="mb-5">
            <label className="feild-label">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="field-input field-input-focus"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-5">
            <label className="feild-label">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="field-input field-input-focus"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-5">
            <label className="feild-label">Message</label>
           <textarea
  name="message"
  rows="4"
  value={formData.message}
  onChange={handleChange}
  className="field-input field-input-focus"
  placeholder="Share your thoughts..."
  required
/>

<p className="text-xs text-gray-400 mt-1">
  {formData.message.length}/10 characters minimum
</p>
          </div>

          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!loading ? "Send" : "Sending..."}
          </button>

        </form>

      </div>
    </section>
  );
};

export default Contact;