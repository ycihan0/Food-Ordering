import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 25,
  secure: false, // TLS/SSL kullanmıyoruz
  auth: {
    user: "",
    pass: "",
  },
});

export const sendReservationEmail = async (to, reservationDetails) => {
  const { fullName, date, persons, phoneNumber, email } = reservationDetails;
  const mailOptions = {
    from: `"Sizzle" <no-reply@sizzle.com>`, // Gönderici adresi
    to: to, // Alıcı adresi
    subject: "Reservation Request Successful", // Konu
    text: `Dear ${fullName},\n\nYour reservation request has been successfully created. We will notify you by email once it is confirmed.\n\nReservation Details:\n- Date: ${date}\n- Number of persons: ${persons}\n- Phone Number: ${phoneNumber}\n- Email: ${email}\n\nThank you for choosing us!`, // Düz metin içeriği
    html: `
    <p>Dear ${fullName},</p>
    <p>Your reservation request has been successfully created. We will notify you by email once it is confirmed.</p>
    <p><strong>Reservation Details:</strong></p>
    <ul>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Number of persons:</strong> ${persons}</li>
      <li><strong>Phone Number:</strong> ${phoneNumber}</li>
      <li><strong>Email:</strong> ${email}</li>
    </ul>
    <p>Thank you for choosing us!</p>
    <p>Best regards,<br>Sizzle Team</p>
  `, // HTML içeriği
  };

  await transporter.sendMail(mailOptions);
};



export const sendReservationConfirmationEmail = async (
  to,
  reservationDetails
) => {
  const { fullName, date, persons, phoneNumber, email } = reservationDetails;

  const mailOptions = {
    from: `"Sizzle" <no-reply@sizzle.com>`, // Gönderici adresi
    to: to, // Alıcı adresi
    subject: "Reservation Confirmed", // Konu
    text: `Dear ${fullName},\n\nYour reservation has been confirmed. We look forward to serving you.\n\nReservation Details:\n- Date: ${date}\n- Number of persons: ${persons}\n- Phone Number: ${phoneNumber}\n- Email: ${email}\n\nThank you for choosing us!`, // Düz metin içeriği
    html: `
      <p>Dear ${fullName},</p>
      <p>Your reservation has been confirmed. We look forward to serving you.</p>
      <p><strong>Reservation Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Number of persons:</strong> ${persons}</li>
        <li><strong>Phone Number:</strong> ${phoneNumber}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>
      <p>Thank you for choosing us!</p>
      <p>Best regards,<br>Sizzle Team</p>
    `, // HTML içeriği
  };

  await transporter.sendMail(mailOptions);
};

export const sendReservationRejectionEmail = async (to, reservationDetails) => {
    const { fullName, date, persons } = reservationDetails;
  
    const mailOptions = {
      from: `"Sizzle" <no-reply@sizzle.com>`, // Gönderici adresi
      to: to, // Alıcı adresi
      subject: "Reservation Rejected", // Konu
      text: `Dear ${fullName},\n\nWe regret to inform you that your reservation request has been rejected.\n\nReservation Details:\n- Date: ${date}\n- Number of persons: ${persons}\n\nWe apologize for any inconvenience this may cause.\n\nBest regards,\nSizzle Team`, // Düz metin içeriği
      html: `
      <p>Dear ${fullName},</p>
      <p>We regret to inform you that your reservation request has been rejected.</p>
      <p><strong>Reservation Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Number of persons:</strong> ${persons}</li>
      </ul>
      <p>We apologize for any inconvenience this may cause.</p>
      <p>Best regards,<br>Sizzle Team</p>
    `, // HTML içeriği
    };
  
    await transporter.sendMail(mailOptions);
  };