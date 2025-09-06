import React, { useState } from "react";

interface Program {
  id?: string;
  name: string;
  type: "stamps" | "points";
  startDate: string;
  endDate?: string;
  reward: string;
  members: number;
  redeemed: number;
  stampsRequired?: number;
  status: "active" | "draft" | "inactive";
  cardBackground?: string;
  stampIcon?: string;
  stampBackground?: string;
}

interface Props {
  program: Program | null;
  onSave: (program: Program) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
  navigateToPage: (page: string) => void;
}

const ORBIT_YELLOW = "#FFB000";

const BusinessProgramOverlay: React.FC<Props> = ({
  program,
  onSave,
  onClose,
  onDelete,
  navigateToPage,
}) => {
  const [form, setForm] = useState<Program>(
    program || {
      name: "",
      type: "stamps",
      startDate: "",
      reward: "",
      members: 0,
      redeemed: 0,
      status: "active",
      stampsRequired: 1,
      cardBackground: "#ffffff",
      stampIcon: "",
      stampBackground: "#e5e5e5",
    }
  );

  const isViewing = !!program; // true when viewing existing program

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleCardBackgroundChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, cardBackground: url }));
    }
  };

  const handleStampIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, stampIcon: url }));
    }
  };

  const renderStampsGrid = () => {
    const count = form.stampsRequired || 1;

    let topRowCount: number;
    let bottomRowCount: number;

    if (count % 2 === 0) {
      topRowCount = count / 2;
      bottomRowCount = count / 2;
    } else {
      topRowCount = Math.ceil(count / 2);
      bottomRowCount = count - topRowCount;
    }

    const renderRow = (rowCount: number, rowKey: string) => (
      <div className="flex justify-center gap-5">
        {Array.from({ length: rowCount }).map((_, i) => (
          <div
            key={`${rowKey}-${i}`}
            className="w-14 h-14 rounded-full flex items-center justify-center relative"
            style={{ backgroundColor: form.stampBackground || "#e5e5e5" }}
          >
            {form.stampIcon && (
              <img
                src={form.stampIcon}
                alt="stamp"
                className="w-12 h-12 object-contain absolute"
              />
            )}
          </div>
        ))}
      </div>
    );

    return (
      <div className="absolute inset-2 flex flex-col items-center justify-center gap-8">
        {renderRow(topRowCount, "top")}
        {bottomRowCount > 0 && renderRow(bottomRowCount, "bottom")}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-6xl shadow-lg relative">
        {/* Back button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500"
        >
          ← Back
        </button>

        {/* Program name */}
        {form.id ? (
          <h2 className="text-2xl font-semibold text-center mb-6">
            {form.name}
          </h2>
        ) : (
          <div className="flex justify-center mb-6">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Program Name"
              className="text-2xl font-semibold text-center border-b border-gray-400 focus:outline-none"
            />
          </div>
        )}

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top-left: Program details */}
          <div className="space-y-4">
            <label className="block">
              Type of Program:
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                disabled={isViewing}
                className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
              >
                <option value="stamps">Stamps System</option>
                <option value="points">Points System</option>
              </select>
            </label>

            <label className="block">
              Start Date:
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                disabled={isViewing}
                className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
              />
            </label>

            <label className="block">
              End Date (optional):
              <input
                type="date"
                name="endDate"
                value={form.endDate || ""}
                onChange={handleChange}
                disabled={isViewing}
                className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
              />
            </label>

            <label className="block">
              Reward:
              <input
                type="text"
                name="reward"
                value={form.reward}
                onChange={handleChange}
                placeholder="Reward"
                disabled={isViewing}
                className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
              />
            </label>
          </div>

          {/* Top-right: Card preview */}
          <div className="bg-gray-100 rounded-lg p-2 flex items-center justify-center relative">
            <div
              className="w-[420px] h-[260px] rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: form.cardBackground?.startsWith("#")
                  ? form.cardBackground
                  : form.cardBackground
                  ? `url(${form.cardBackground}) center/cover no-repeat`
                  : "#ffffff",
              }}
            >
              {form.type === "stamps" ? (
                renderStampsGrid()
              ) : (
                <div className="absolute bottom-6 w-4/5 flex justify-center">
                  <div className="w-full h-6 bg-gray-300 rounded-full">
                    <div
                      className="h-6 rounded-full"
                      style={{
                        width: "60%",
                        backgroundColor: ORBIT_YELLOW,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom-left: Stats section */}
          <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
            <div className="text-lg font-medium">
              Total Members: {form.members}
            </div>
            <div className="text-lg font-medium">
              Redeemed Reward: {form.redeemed}
            </div>
          </div>

          {/* Bottom-right: Customization */}
          <div className="space-y-4">
            {form.type === "stamps" && (
              <>
                <label className="block">
                  Stamp Icon:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleStampIconChange}
                    className="mt-1"
                    disabled={isViewing}
                  />
                </label>
                <label className="block">
                  Stamp Background:
                  <input
                    type="color"
                    value={form.stampBackground || "#e5e5e5"}
                    onChange={handleChange}
                    name="stampBackground"
                    disabled={isViewing}
                    className="w-full h-10 mt-1 p-0 border border-black rounded"
                  />
                </label>
              </>
            )}

            <label className="block">
              Card Background:
              <input
                type="color"
                value={
                  form.cardBackground?.startsWith("#")
                    ? form.cardBackground
                    : "#ffffff"
                }
                onChange={handleChange}
                name="cardBackground"
                disabled={isViewing}
                className="w-full h-10 mt-1 p-0 border border-black rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleCardBackgroundChange}
                disabled={isViewing}
                className="mt-1"
              />
            </label>

            <label className="block">
              {form.type === "stamps"
                ? "Number of Stamps"
                : "Number of Points"}
              :
              <input
                type="number"
                name="stampsRequired"
                min={1}
                value={form.stampsRequired}
                onChange={handleNumberChange}
                disabled={isViewing}
                className="w-full border rounded-lg px-3 py-2 mt-1 disabled:bg-gray-100"
              />
            </label>
          </div>
        </div>

        {/* Bottom action buttons */}
        <div className="flex justify-end gap-3 mt-6">
          {form.id && (
            <button
              onClick={() => navigateToPage("business-dashboard")}
              className="px-4 py-2 rounded-full text-[#FFB000] border border-[#FFB000] bg-white"
            >
              View on Dashboard
            </button>
          )}
          {form.id && (
            <button
              onClick={() => onDelete(form.id!)}
              className="px-4 py-2 bg-red-500 text-white rounded-full"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 rounded-full text-white"
            style={{ backgroundColor: ORBIT_YELLOW }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessProgramOverlay;


