import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
} from "lucide-react";

const DoctorAppointmentPage = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientEmail: "sarah.johnson@email.com",
      patientPhone: "+1 (555) 123-4567",
      patientAge: 32,
      patientGender: "Female",
      appointmentDate: "2025-05-28",
      appointmentTime: "09:00 AM",
      symptoms: "Persistent headaches and dizziness for the past week",
      appointmentType: "Consultation",
      status: "pending",
      priority: "medium",
      reason: "",
      createdAt: "2025-05-26T10:30:00Z",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientEmail: "michael.chen@email.com",
      patientPhone: "+1 (555) 234-5678",
      patientAge: 45,
      patientGender: "Male",
      appointmentDate: "2025-05-28",
      appointmentTime: "10:30 AM",
      symptoms: "Follow-up for diabetes management and blood sugar monitoring",
      appointmentType: "Follow-up",
      status: "accepted",
      priority: "high",
      reason: "",
      createdAt: "2025-05-25T14:20:00Z",
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      patientEmail: "emily.rodriguez@email.com",
      patientPhone: "+1 (555) 345-6789",
      patientAge: 28,
      patientGender: "Female",
      appointmentDate: "2025-05-29",
      appointmentTime: "02:00 PM",
      symptoms: "Chest pain and shortness of breath during exercise",
      appointmentType: "Emergency",
      status: "pending",
      priority: "high",
      reason: "",
      createdAt: "2025-05-26T16:45:00Z",
    },
    {
      id: 4,
      patientName: "David Wilson",
      patientEmail: "david.wilson@email.com",
      patientPhone: "+1 (555) 456-7890",
      patientAge: 55,
      patientGender: "Male",
      appointmentDate: "2025-05-29",
      appointmentTime: "11:00 AM",
      symptoms: "Routine checkup and blood pressure monitoring",
      appointmentType: "Routine",
      status: "declined",
      priority: "low",
      reason: "Schedule conflict - patient requested different time slot",
      createdAt: "2025-05-24T09:15:00Z",
    },
    {
      id: 5,
      patientName: "Lisa Thompson",
      patientEmail: "lisa.thompson@email.com",
      patientPhone: "+1 (555) 567-8901",
      patientAge: 38,
      patientGender: "Female",
      appointmentDate: "2025-05-30",
      appointmentTime: "03:30 PM",
      symptoms: "Skin rash and allergic reactions after medication",
      appointmentType: "Consultation",
      status: "pending",
      priority: "medium",
      reason: "",
      createdAt: "2025-05-26T11:00:00Z",
    },
    {
      id: 6,
      patientName: "Robert Brown",
      patientEmail: "robert.brown@email.com",
      patientPhone: "+1 (555) 678-9012",
      patientAge: 62,
      patientGender: "Male",
      appointmentDate: "2025-05-30",
      appointmentTime: "09:30 AM",
      symptoms: "Joint pain and stiffness in knees and hands",
      appointmentType: "Consultation",
      status: "accepted",
      priority: "medium",
      reason: "",
      createdAt: "2025-05-25T08:30:00Z",
    },
  ]);

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    type: "",
    appointmentId: null,
  });
  const [actionReason, setActionReason] = useState("");

  // Filter and search appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle appointment actions
  const handleAppointmentAction = (appointmentId, action, reason = "") => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              status: action,
              reason: action === "declined" ? reason : "",
            }
          : apt
      )
    );
    setActionModal({ isOpen: false, type: "", appointmentId: null });
    setActionReason("");
  };

  const openActionModal = (type, appointmentId) => {
    setActionModal({ isOpen: true, type, appointmentId });
    setActionReason("");
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      accepted: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Accepted",
      },
      declined: { bg: "bg-red-100", text: "text-red-800", label: "Declined" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: { bg: "bg-gray-100", text: "text-gray-600", label: "Low" },
      medium: { bg: "bg-blue-100", text: "text-blue-600", label: "Medium" },
      high: { bg: "bg-orange-100", text: "text-orange-600", label: "High" },
    };
    const config = priorityConfig[priority] || priorityConfig.medium;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="">
        <div className="">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-600 mt-1">
                Manage and review patient appointments
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium text-blue-700">
                  Total: {filteredAppointments.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="lg:px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by patient name or symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="px-4 lg:px-6 py-6 mb-20 bg-gray-100">
        <div className="space-y-4">
          {currentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 py-6 lg:p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.patientName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {appointment.patientAge} years •{" "}
                      {appointment.patientGender}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(appointment.priority)}
                  {getStatusBadge(appointment.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">
                    {appointment.appointmentDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">
                    {appointment.appointmentTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">
                    {appointment.patientPhone}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">
                    {appointment.patientEmail}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="text-gray-400 mt-1" size={16} />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Symptoms:
                    </p>
                    <p className="text-sm text-gray-600">
                      {appointment.symptoms}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {appointment.appointmentType}
                </span>
              </div>

              {appointment.reason && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">Reason:</p>
                  <p className="text-sm text-gray-600">{appointment.reason}</p>
                </div>
              )}

              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between items-center pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedAppointment(appointment)}
                  className="flex cursor-pointer items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Eye size={16} />
                  <span>View Details</span>
                </button>

                {appointment.status === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openActionModal("accept", appointment.id)}
                      className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <Check size={16} />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => openActionModal("decline", appointment.id)}
                      className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      <X size={16} />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredAppointments.length)}{" "}
              of {filteredAppointments.length} appointments
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="flex space-x-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {actionModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {actionModal.type === "accept"
                ? "Accept Appointment"
                : "Decline Appointment"}
            </h3>

            {actionModal.type === "decline" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for declining (required):
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  rows={3}
                  className="w-full resize-none outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide a reason for declining this appointment..."
                />
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() =>
                  setActionModal({
                    isOpen: false,
                    type: "",
                    appointmentId: null,
                  })
                }
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (actionModal.type === "decline" && !actionReason.trim()) {
                    alert("Please provide a reason for declining");
                    return;
                  }
                  handleAppointmentAction(
                    actionModal.appointmentId,
                    actionModal.type === "accept" ? "accepted" : "declined",
                    actionReason
                  );
                }}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  actionModal.type === "accept"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {actionModal.type === "accept" ? "Accept" : "Decline"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Patient Information
                  </h4>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedAppointment.patientName}
                    </p>
                    <p>
                      <span className="font-medium">Age:</span>{" "}
                      {selectedAppointment.patientAge}
                    </p>
                    <p>
                      <span className="font-medium">Gender:</span>{" "}
                      {selectedAppointment.patientGender}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedAppointment.patientPhone}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedAppointment.patientEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Appointment Details
                  </h4>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {selectedAppointment.appointmentDate}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span>{" "}
                      {selectedAppointment.appointmentTime}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span>{" "}
                      {selectedAppointment.appointmentType}
                    </p>
                    <p>
                      <span className="font-medium">Priority:</span>{" "}
                      {selectedAppointment.priority}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {getStatusBadge(selectedAppointment.status)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                {selectedAppointment.symptoms}
              </p>
            </div>

            {selectedAppointment.reason && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Reason</h4>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {selectedAppointment.reason}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentPage;
