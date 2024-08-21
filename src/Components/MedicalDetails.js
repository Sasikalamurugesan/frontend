import React from 'react';
import '../Styles/MedicalDetails.css';

const MedicalDetails = ({ details }) => {
  return (
    <div className="medical-details-container">
      <h3>Medical Details</h3>
      <p><strong>Affected Side:</strong> {details.affectedSide}</p>
      <p><strong>Condition:</strong> {details.condition}</p>
      <p><strong>Specialty:</strong> {details.specialty}</p>
      <p><strong>Medical History:</strong> {details.medicalHistory}</p>
    </div>
  );
};

export default MedicalDetails;
