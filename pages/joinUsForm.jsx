import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { WhyJoinUs } from "@/components/WhyJoinUs";
import emailjs from "emailjs-com";
import { useRef, useState } from "react";

export const JoinUsForm = () => {
  const form = useRef();
  const [selectedServices, setSelectedServices] = useState([]);
  const [message, setMessage] = useState("");

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    setSelectedServices((prev) =>
      checked ? [...prev, value] : prev.filter((service) => service !== value)
    );

    // Mise à jour immédiate du message pour inclure ou exclure le service sélectionné
    let updatedMessage = message.split("\n\nServices sélectionnés:")[0]; // Conserver la partie du message avant la liste des services
    const newSelectedServices = checked
      ? [...selectedServices, value]
      : selectedServices.filter((service) => service !== value);

    // Ajouter la liste mise à jour des services au message
    if (newSelectedServices.length > 0) {
      updatedMessage +=
        "\n\nServices sélectionnés:\n" +
        newSelectedServices.map((service) => `- ${service}`).join("\n");
    }
    setMessage(updatedMessage);
  };

  const handleMessageChange = (event) => {
    // Mise à jour du message sans modifier la liste des services
    const userMessage = event.target.value.split(
      "\n\nServices sélectionnés:"
    )[0];
    setMessage(
      userMessage +
        (selectedServices.length > 0
          ? "\n\nServices sélectionnés:\n" +
            selectedServices.map((service) => `- ${service}`).join("\n")
          : "")
    );
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Construire l'objet de données pour EmailJS
    const emailParams = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: message, // Utiliser directement l'état du message mis à jour
    };

    emailjs
      .send(
        "service_h0fnhoa", // Votre service ID
        "template_7vhxz3g", // Votre template ID
        emailParams, // Les données à envoyer
        "6TaqFwkQZzef6sNsq" // Votre user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message envoyé avec succès !");
        },
        (error) => {
          console.log(error.text);
          alert("Erreur lors de l'envoi du message.");
        }
      );

    form.current.reset(); // Utiliser reset sur l'élément form directement
    setSelectedServices([]); // Réinitialiser les services sélectionnés après l'envoi
    setMessage(""); // Réinitialiser le message après l'envoi
  };

  return (
    <div>
      <Header />
      <WhyJoinUs />
      <div className="max-w-4xl mx-auto p-8">
        <p className="text-lg mb-4">
          Veuillez préciser le nom, l&apos;adresse, la ville, et le département
          de votre garage dans votre message. Cochez les services que vous
          offrez.
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom*
            </label>
            <input
              type="text"
              name="user_name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email*
            </label>
            <input
              type="email"
              name="user_email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message*
            </label>
            <textarea
              name="message"
              value={message}
              onChange={handleMessageChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 mb-2">
              Services*
            </span>
            {/* Liste des services à cocher, avec gestion des changements */}
            {[
              "Entretien général",
              "Service des pneus",
              "Réparation des freins",
              "Diagnostic électronique",
              "Travaux de carrosserie",
            ].map((service, index) => (
              <label key={index} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  onChange={handleServiceChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{service}</span>
              </label>
            ))}
          </div>
          <input
            type="submit"
            value="Envoyer"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default JoinUsForm;
