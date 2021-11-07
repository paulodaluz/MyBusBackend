export interface FeedbackApp {
  emailSender: string;
  nameSender: string;
  feedback: string;
}

export interface FeedbackVehicle extends FeedbackApp {
  vehicleName: string;
  vehicleRegistrationPlate: string;
}
