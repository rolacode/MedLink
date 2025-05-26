import { useState } from "react";

const AppointmentRequest = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Deborah Rostimi",
      symptoms: "Checking my vitals and health status",
      date: "23/05/2025",
      status: "Pending",
      message: "",
    },
    {
      id: 2,
      patient: "Timothy David",
      symptoms: "Constant headaches and sweating",
      date: "20/05/2025",
      status: "Pending",
      message: "",
    },
  ]);

  const handleApprove = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "Approved" } : apt
      )
    );
  };

  const handleReject = (id) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "Rejected" } : apt
      )
    );
  };

  const handleMessageChange = (id, message) => {
    setAppointments(
      appointments.map((apt) => (apt.id === id ? { ...apt, message } : apt))
    );
  };

  return (
    <div className="w-full p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-[18px] lg:text-[22px] font-semibold text-gray-800 mb-6">
        Appointment Request
      </h2>

      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">
                  Patient:
                </span>
                <span className="text-sm text-gray-800">
                  {appointment.patient}
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-600">
                  Symptoms:
                </span>
                <span className="text-sm text-gray-800 text-right max-w-48">
                  {appointment.symptoms}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Date:</span>
                <span className="text-sm text-gray-800">
                  {appointment.date}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Status:
                </span>
                <span
                  className={`text-sm px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Add a message"
                value={appointment.message}
                onChange={(e) =>
                  handleMessageChange(appointment.id, e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {appointment.status === "Pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(appointment.id)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(appointment.id)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
          See All
        </button>
      </div>
    </div>
  );
};

export default AppointmentRequest;
