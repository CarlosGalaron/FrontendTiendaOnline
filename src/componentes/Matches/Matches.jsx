import React from "react";
import matchApi from "../../api/matchApi";

const MatchCard = ({ match, userId, onMatchUpdated }) => {
  const handleAccept = async () => {
    try {
      await matchApi.updateMatchState(match.id, userId, true); // Aceptar el match
      onMatchUpdated(); // Recargar la lista de matches
    } catch (error) {
      console.error("Error al aceptar el match:", error);
    }
  };

  const handleReject = async () => {
    try {
      await matchApi.updateMatchState(match.id, userId, false); // Rechazar el match
      onMatchUpdated(); // Recargar la lista de matches
    } catch (error) {
      console.error("Error al rechazar el match:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-2">Intercambio con usuario {match.id_user2}</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Mi intercambio */}
        <div className="p-2 bg-gray-100 rounded">
          <h4 className="font-bold">Mi Oferta</h4>
          <p>{match.myOffer?.title} - {match.myOffer?.author}</p>

          <h4 className="font-bold mt-2">Mi Solicitud</h4>
          <p>{match.myRequest?.title} - {match.myRequest?.author}</p>
        </div>

        {/* Oferta del otro usuario */}
        <div className="p-2 bg-gray-100 rounded">
          <h4 className="font-bold">Oferta del Otro Usuario</h4>
          <p>{match.otherOffer?.title} - {match.otherOffer?.author}</p>

          <h4 className="font-bold mt-2">Su Solicitud</h4>
          <p>{match.otherRequest?.title} - {match.otherRequest?.author}</p>
        </div>
      </div>

      {/* Botones para aceptar o rechazar */}
      <div className="mt-4 flex justify-end gap-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleAccept}>
          Aceptar
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleReject}>
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
