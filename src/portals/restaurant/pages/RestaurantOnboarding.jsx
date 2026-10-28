import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import usePincodeLookup from "../../../global/hooks/usePincodeLookup";
import { RESTAURANT_ROUTES } from "../../../routes/RestaurantRouteConstants";
import useRestaurantCuisineMetadata from "../hooks/useRestaurantCuisineMetadata";

import "./restaurantOnboarding.css";

const TOTAL_STEPS = 4;
const DRAFT_STORAGE_KEY = "freshmeal.restaurantOnboarding.draft.v2";
const COMPLETED_STORAGE_KEY = "freshmeal.restaurantOnboarding.completed.v2";
const MAX_IMAGE_SIZE_BYTES = 1 * 1024 * 1024;

const INITIAL_FORM_STATE = {
  restaurantName: "",
  description: "",
  cuisineTypes: [],
  restaurantLogo: null,
  coverPhoto: null,
  branchName: "",
  branchPhoto: null,
  address: {
    houseNumber: "",
    apartmentName: "",
    street: "",
    area: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
  },
  operatingHours: [
    {
      dayOfWeek: "MONDAY",
      openingTime: "09:00",
      closingTime: "21:00",
      closed: false,
    },
    {
      dayOfWeek: "TUESDAY",
      openingTime: "09:00",
      closingTime: "21:00",
      closed: false,
    },
    {
      dayOfWeek: "WEDNESDAY",
      openingTime: "09:00",
      closingTime: "21:00",
      closed: false,
    },
    {
      dayOfWeek: "THURSDAY",
      openingTime: "09:00",
      closingTime: "21:00",
      closed: false,
    },
    {
      dayOfWeek: "FRIDAY",
      openingTime: "09:00",
      closingTime: "21:00",
      closed: false,
    },
    {
      dayOfWeek: "SATURDAY",
      openingTime: "09:00",
      closingTime: "21:00",
      closed: false,
    },
    {
      dayOfWeek: "SUNDAY",
      openingTime: "09:00",
      closingTime: "21:00",
      closed: true,
    },
  ],
  phoneNumber: "",
  emailAddress: "",
  website: "",
  branchContactName: "",
  branchContactPhone: "",
  branchContactEmail: "",
};

const STEP_DETAILS = [
  {
    title: "Restaurant profile",
    description: "Introduce your brand and the food you serve.",
    icon: "bi-shop",
  },
  {
    title: "First branch",
    description: "Add your location and help customers find you.",
    icon: "bi-geo-alt",
  },
  {
    title: "Opening hours",
    description: "Tell customers when your kitchen is open.",
    icon: "bi-clock",
  },
  {
    title: "Contact & review",
    description: "Confirm your details before saving your draft.",
    icon: "bi-check2-circle",
  },
];

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const readStoredState = () => {
  try {
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!stored) return INITIAL_FORM_STATE;
    const parsed = JSON.parse(stored);
    return {
      ...INITIAL_FORM_STATE,
      ...parsed,
      address: { ...INITIAL_FORM_STATE.address, ...(parsed.address || {}) },
      operatingHours: DAYS.map(
        (day) =>
          parsed.operatingHours?.find((item) => item.dayOfWeek === day) ||
          INITIAL_FORM_STATE.operatingHours.find(
            (item) => item.dayOfWeek === day,
          ),
      ),
    };
  } catch {
    return INITIAL_FORM_STATE;
  }
};

const RestaurantOnboarding = () => {
  const navigate = useNavigate();
  const {
    cuisineOptions = [],
    isLoading: isLoadingMetadata,
    error: metadataError,
    retry: retryCuisineMetadata,
  } = useRestaurantCuisineMetadata();
  const {
    lookupPincode,
    resetLookup,
    isLoading: isLookingUpPincode,
    error: pincodeError,
    locationDetails,
  } = usePincodeLookup();

  const [formData, setFormData] = useState(readStoredState);
  const [currentStep, setCurrentStep] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [notice, setNotice] = useState("");
  const [savedAt, setSavedAt] = useState(null);

  const address = formData.address;
  const locationVerified =
    Boolean(locationDetails) && locationDetails.pincode === address.pincode;
  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      setSavedAt(new Date());
    } catch {
      setNotice(
        "Your draft could not be saved in this browser. Try removing a large image and saving again.",
      );
    }
  }, [formData]);

  const updateField = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setValidationError("");
    setNotice("");
  };

  const updateAddress = (event) => {
    const { name, value } = event.target;
    if (name === "pincode") {
      const pincode = value.replace(/\D/g, "").slice(0, 6);
      resetLookup();
      setFormData((previous) => ({
        ...previous,
        address: {
          ...previous.address,
          pincode,
          district: "",
          state: "",
          country: "India",
        },
      }));
    } else {
      setFormData((previous) => ({
        ...previous,
        address: { ...previous.address, [name]: value },
      }));
    }
    setValidationError("");
  };

  const toggleCuisine = (value) => {
    setFormData((previous) => ({
      ...previous,
      cuisineTypes: previous.cuisineTypes.includes(value)
        ? previous.cuisineTypes.filter((item) => item !== value)
        : [...previous.cuisineTypes, value],
    }));
    setValidationError("");
  };

  const handlePincodeLookup = async () => {
    const pincode = address.pincode.trim();
    if (!/^[0-9]{6}$/.test(pincode)) {
      setValidationError("Please enter a valid six-digit Indian pincode.");
      return;
    }
    setValidationError("");
    const details = await lookupPincode(pincode);
    if (!details) return;
    setFormData((previous) =>
      previous.address.pincode !== pincode
        ? previous
        : {
            ...previous,
            address: {
              ...previous.address,
              country: details.country || "India",
              state: details.state || "",
              district: details.district || "",
            },
          },
    );
  };

  const handleImageChange = (field, file) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setValidationError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setValidationError(
        "Please choose an image smaller than 1 MB to keep your browser draft lightweight.",
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      updateField(field, {
        name: file.name,
        dataUrl: reader.result,
        type: file.type,
        size: file.size,
      });
    reader.onerror = () =>
      setValidationError(
        "The selected image could not be read. Please try another file.",
      );
    reader.readAsDataURL(file);
  };

  const removeImage = (field) => updateField(field, null);

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.restaurantName.trim())
        return "Please enter your restaurant name.";
      if (formData.restaurantName.trim().length > 150)
        return "Restaurant name must not exceed 150 characters.";
      if (!formData.cuisineTypes.length)
        return "Please select at least one cuisine type.";
    }
    if (currentStep === 2) {
      if (!formData.branchName.trim()) return "Please enter your branch name.";
      if (
        !address.street.trim() ||
        !address.area.trim() ||
        !address.city.trim()
      ) {
        return "Please complete the street, area, and city fields.";
      }
      if (!/^[0-9]{6}$/.test(address.pincode.trim()))
        return "Please enter a valid six-digit Indian pincode.";
      if (!address.state.trim() || !address.country.trim())
        return "Please look up your pincode and confirm the location details.";
      if (!locationVerified)
        return "Please look up the current pincode before continuing.";
    }
    if (currentStep === 3) {
      const openDays = formData.operatingHours.filter((item) => !item.closed);
      if (!openDays.length) return "Please keep at least one day open.";
      for (const item of openDays) {
        if (
          !item.openingTime ||
          !item.closingTime ||
          item.openingTime >= item.closingTime
        ) {
          return `Please check the opening and closing times for ${item.dayOfWeek.toLowerCase()}. Overnight hours are not supported yet.`;
        }
      }
    }
    if (currentStep === 4) {
      if (
        formData.phoneNumber &&
        !/^[+()\d\s-]{7,20}$/.test(formData.phoneNumber)
      )
        return "Please enter a valid restaurant phone number.";
      if (
        formData.emailAddress &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)
      )
        return "Please enter a valid restaurant email address.";
      if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website))
        return "Website must start with http:// or https://.";
      if (
        formData.branchContactPhone &&
        !/^[+()\d\s-]{7,20}$/.test(formData.branchContactPhone)
      )
        return "Please enter a valid branch contact phone number.";
      if (
        formData.branchContactEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.branchContactEmail)
      )
        return "Please enter a valid branch contact email address.";
    }
    return "";
  };

  const handleContinue = (event) => {
    event.preventDefault();
    const error = validateStep();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");
    if (currentStep < TOTAL_STEPS) setCurrentStep((step) => step + 1);
    else handleSaveLocally();
  };

  const handleSaveLocally = () => {
    try {
      const record = {
        ...formData,
        restaurantName: formData.restaurantName.trim(),
        branchName: formData.branchName.trim(),
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(record));
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setNotice(
        "Your onboarding details have been saved in this browser. They have not been submitted to the FreshMeal backend.",
      );
    } catch {
      setNotice(
        "The browser could not save these details. Remove an image or reduce its size and try again.",
      );
    }
  };

  const handleBack = () => {
    setValidationError("");
    if (currentStep === 1) {
      navigate(RESTAURANT_ROUTES.SELECT_RESTAURANT);
      return;
    }
    setCurrentStep((step) => step - 1);
  };

  const updateOperatingHour = (index, field, value) => {
    setFormData((previous) => ({
      ...previous,
      operatingHours: previous.operatingHours.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const reviewAddress = useMemo(
    () =>
      [
        address.houseNumber,
        address.apartmentName,
        address.street,
        address.area,
        address.city,
        address.district,
        address.state,
        address.pincode,
        address.country,
      ]
        .filter(Boolean)
        .join(", "),
    [address],
  );

  const renderTextInput = ({
    label,
    name,
    value,
    required = false,
    maxLength,
    placeholder = "",
    type = "text",
    autoComplete,
  }) => (
    <div
      className="col-md-6"
      key={name}>
      <label
        htmlFor={name}
        className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-control"
        value={value}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => updateField(name, event.target.value)}
      />
    </div>
  );

  const renderAddressInput = ({
    label,
    name,
    required = false,
    maxLength,
    placeholder = "",
    autoComplete,
    readOnly = false,
  }) => (
    <div
      className="col-md-6"
      key={name}>
      <label
        htmlFor={`address-${name}`}
        className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        id={`address-${name}`}
        name={name}
        type="text"
        className="form-control"
        value={address[name]}
        onChange={updateAddress}
        maxLength={maxLength}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {readOnly && (
        <div className="form-text">
          <i className="bi bi-shield-check me-1" />
          Filled from pincode lookup.
        </div>
      )}
    </div>
  );

  const ImagePicker = ({ field, title, subtitle, variant = "landscape" }) => {
    const image = formData[field];
    return (
      <div className={`image-picker image-picker--${variant}`}>
        {image?.dataUrl ? (
          <div className="image-picker-preview">
            <img
              src={image.dataUrl}
              alt={`${title} preview`}
            />
            <div className="image-picker-overlay">
              <span className="image-picker-file">
                <i className="bi bi-check-circle-fill me-1" />
                {image.name}
              </span>
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => removeImage(field)}
                aria-label={`Remove ${title}`}>
                <i className="bi bi-trash3 me-1" />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <label
            className="image-picker-empty"
            htmlFor={`upload-${field}`}>
            <span className="image-picker-icon">
              <i
                className={`bi ${variant === "square" ? "bi-image" : "bi-cloud-arrow-up"}`}
              />
            </span>
            <span className="image-picker-title">{title}</span>
            <span className="image-picker-subtitle">{subtitle}</span>
            <span className="image-picker-action">
              <i className="bi bi-plus-lg me-1" />
              Choose photo
            </span>
            <input
              id={`upload-${field}`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                handleImageChange(field, event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>
        )}
        {image?.dataUrl && (
          <label
            className="image-picker-change"
            htmlFor={`upload-${field}`}>
            <i className="bi bi-arrow-repeat me-1" />
            Change photo
            <input
              id={`upload-${field}`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                handleImageChange(field, event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <main className="restaurant-onboarding container-fluid py-3 py-lg-4">
      <div className="onboarding-shell mx-auto">
        <section className="onboarding-hero mb-4">
          <div className="onboarding-hero-content">
            <div className="onboarding-eyebrow">
              <span className="eyebrow-dot" /> FRESHMEAL PARTNER PORTAL
            </div>
            <h1>
              Bring your restaurant to <span>FreshMeal.</span>
            </h1>
            <p>
              Set up your restaurant profile, add your first location, and help
              hungry customers discover you.
            </p>
            <div className="hero-trust-row">
              <span>
                <i className="bi bi-check-circle-fill" /> Simple setup
              </span>
              <span>
                <i className="bi bi-phone-fill" /> Mobile friendly
              </span>
              <span>
                <i className="bi bi-save2-fill" /> Draft auto-saves
              </span>
            </div>
          </div>
          <div
            className="onboarding-hero-art"
            aria-hidden="true">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-plate">
              <i className="bi bi-egg-fried" />
            </div>
            <span className="hero-spark hero-spark-one">✦</span>
            <span className="hero-spark hero-spark-two">✧</span>
          </div>
        </section>

        <div className="onboarding-workspace">
          <aside className="onboarding-sidebar">
            <div className="sidebar-heading">
              YOUR SETUP{" "}
              <span>
                {currentStep}/{TOTAL_STEPS}
              </span>
            </div>
            <div className="step-list">
              {STEP_DETAILS.map((step, index) => {
                const stepNumber = index + 1;
                const isComplete = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;
                return (
                  <div
                    className={`step-item ${isCurrent ? "is-current" : ""} ${isComplete ? "is-complete" : ""}`}
                    key={step.title}>
                    <div className="step-marker">
                      {isComplete ? (
                        <i className="bi bi-check-lg" />
                      ) : (
                        <i className={`bi ${step.icon}`} />
                      )}
                    </div>
                    <div className="step-copy">
                      <strong>{step.title}</strong>
                      <span>{step.description}</span>
                    </div>
                    {isCurrent && (
                      <i className="bi bi-chevron-right step-current-arrow" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="sidebar-tip">
              <div className="sidebar-tip-icon">
                <i className="bi bi-lightbulb" />
              </div>
              <div>
                <strong>Quick tip</strong>
                <p>
                  Clear photos and accurate hours help customers choose your
                  restaurant with confidence.
                </p>
              </div>
            </div>
            {savedAt && (
              <div className="draft-status">
                <i className="bi bi-cloud-check me-2" />
                Draft saved in this browser
              </div>
            )}
          </aside>

          <section className="onboarding-main">
            <header className="step-page-heading">
              <div>
                <div className="step-kicker">
                  STEP {currentStep} <span>OF {TOTAL_STEPS}</span>
                </div>
                <h2>{STEP_DETAILS[currentStep - 1].title}</h2>
                <p>{STEP_DETAILS[currentStep - 1].description}</p>
              </div>
              <div
                className="step-progress-ring"
                style={{ "--progress": `${progressPercentage}%` }}>
                <span>
                  {Math.round(progressPercentage)}
                  <small>%</small>
                </span>
              </div>
            </header>
            <div
              className="onboarding-progress"
              role="progressbar"
              aria-label="Restaurant onboarding progress"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}>
              <div style={{ width: `${progressPercentage}%` }} />
            </div>

            <form
              onSubmit={handleContinue}
              noValidate>
              {currentStep === 1 && (
                <div className="form-step-content">
                  <div className="section-intro">
                    <span className="section-icon">
                      <i className="bi bi-shop-window" />
                    </span>
                    <div>
                      <h3>Make your first impression count</h3>
                      <p>
                        Start with the basics. You can refine your brand details
                        later.
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="restaurantName"
                      className="form-label">
                      Restaurant name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="restaurantName"
                      className="form-control form-control-lg"
                      value={formData.restaurantName}
                      onChange={(event) =>
                        updateField("restaurantName", event.target.value)
                      }
                      maxLength={150}
                      placeholder="e.g. The Fresh Kitchen"
                      autoComplete="organization"
                    />
                    <div className="field-hint">
                      <span>This is how customers will recognize you.</span>
                      <span>{formData.restaurantName.length}/150</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="form-label">
                      About your restaurant{" "}
                      <span className="optional-label">Optional</span>
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      rows={3}
                      maxLength={1000}
                      value={formData.description}
                      onChange={(event) =>
                        updateField("description", event.target.value)
                      }
                      placeholder="Tell customers what makes your food special..."
                    />
                    <div className="field-hint">
                      <span>
                        A short introduction can help your restaurant stand out.
                      </span>
                      <span>{formData.description.length}/1000</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="section-label-row">
                      <label className="form-label mb-1">
                        Cuisine types <span className="text-danger">*</span>
                      </label>
                      <span className="selection-count">
                        {formData.cuisineTypes.length} selected
                      </span>
                    </div>
                    <p className="form-help">
                      Choose every cuisine that best describes your menu.
                    </p>
                    {isLoadingMetadata ? (
                      <div className="inline-loading">
                        <span className="spinner-border spinner-border-sm" />{" "}
                        Loading cuisine options…
                      </div>
                    ) : metadataError ? (
                      <div className="alert alert-warning py-2">
                        <p className="mb-2">{metadataError}</p>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={retryCuisineMetadata}>
                          Try again
                        </button>
                      </div>
                    ) : cuisineOptions.length === 0 ? (
                      <p className="form-help">
                        No cuisine options are available right now. Please retry
                        later.
                      </p>
                    ) : (
                      <div className="cuisine-grid">
                        {cuisineOptions.map((cuisine) => {
                          const selected = formData.cuisineTypes.includes(
                            cuisine.value,
                          );
                          return (
                            <label
                              key={cuisine.value}
                              className={`cuisine-chip ${selected ? "is-selected" : ""}`}>
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() => toggleCuisine(cuisine.value)}
                              />
                              <span className="cuisine-check">
                                <i className="bi bi-check2" />
                              </span>
                              <span>{cuisine.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="photo-section">
                    <div className="section-intro section-intro--small">
                      <span className="section-icon">
                        <i className="bi bi-camera" />
                      </span>
                      <div>
                        <h3>Show off your brand</h3>
                        <p>
                          Photos are optional for now. Add them whenever you're
                          ready.
                        </p>
                      </div>
                    </div>
                    <div className="photo-grid">
                      <div>
                        <div className="photo-label">
                          Restaurant logo <span>Square works best</span>
                        </div>
                        <ImagePicker
                          field="restaurantLogo"
                          title="Add your logo"
                          subtitle="PNG, JPG or WebP · up to 1 MB"
                          variant="square"
                        />
                      </div>
                      <div>
                        <div className="photo-label">
                          Cover photo <span>Wide image</span>
                        </div>
                        <ImagePicker
                          field="coverPhoto"
                          title="Add a cover photo"
                          subtitle="Food, ambience or your storefront"
                          variant="landscape"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step-content">
                  <div className="section-intro">
                    <span className="section-icon">
                      <i className="bi bi-geo-alt" />
                    </span>
                    <div>
                      <h3>Where can customers find you?</h3>
                      <p>Use the address of your first restaurant branch.</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="branchName"
                      className="form-label">
                      Branch name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="branchName"
                      className="form-control"
                      value={formData.branchName}
                      onChange={(event) =>
                        updateField("branchName", event.target.value)
                      }
                      maxLength={150}
                      placeholder="e.g. Salt Lake Branch"
                    />
                  </div>
                  <div className="address-panel">
                    <div className="address-panel-heading">
                      <div>
                        <h3>Branch address</h3>
                        <p>Fields marked * are required.</p>
                      </div>
                      <span className="address-india">
                        <i className="bi bi-geo-fill me-1" />
                        India
                      </span>
                    </div>
                    <div className="row g-3">
                      {renderAddressInput({
                        label: "House / building number",
                        name: "houseNumber",
                        maxLength: 100,
                        placeholder: "e.g. 12A",
                        autoComplete: "address-line2",
                      })}
                      {renderAddressInput({
                        label: "Apartment / building name",
                        name: "apartmentName",
                        maxLength: 150,
                        placeholder: "Building or complex",
                      })}
                      {renderAddressInput({
                        label: "Street",
                        name: "street",
                        required: true,
                        maxLength: 150,
                        placeholder: "Street or road name",
                        autoComplete: "address-line1",
                      })}
                      {renderAddressInput({
                        label: "Area / locality",
                        name: "area",
                        required: true,
                        maxLength: 150,
                        placeholder: "Neighbourhood or locality",
                      })}
                      {renderAddressInput({
                        label: "Landmark",
                        name: "landmark",
                        maxLength: 200,
                        placeholder: "Nearby landmark (optional)",
                      })}
                      {renderAddressInput({
                        label: "City",
                        name: "city",
                        required: true,
                        maxLength: 100,
                        placeholder: "Enter city",
                        autoComplete: "address-level2",
                      })}
                      {renderAddressInput({
                        label: "District",
                        name: "district",
                        maxLength: 100,
                        readOnly: locationVerified,
                      })}
                      {renderAddressInput({
                        label: "State",
                        name: "state",
                        required: true,
                        maxLength: 100,
                        readOnly: locationVerified,
                        autoComplete: "address-level1",
                      })}
                      {renderAddressInput({
                        label: "Country",
                        name: "country",
                        required: true,
                        maxLength: 100,
                        readOnly: locationVerified,
                        autoComplete: "country-name",
                      })}
                      <div className="col-md-6">
                        <label
                          htmlFor="address-pincode"
                          className="form-label">
                          PIN code <span className="text-danger">*</span>
                        </label>
                        <div className="input-group pincode-group">
                          <input
                            id="address-pincode"
                            name="pincode"
                            inputMode="numeric"
                            autoComplete="postal-code"
                            className="form-control"
                            value={address.pincode}
                            onChange={updateAddress}
                            maxLength={6}
                            placeholder="6-digit PIN code"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={handlePincodeLookup}
                            disabled={
                              isLookingUpPincode ||
                              !/^[0-9]{6}$/.test(address.pincode)
                            }>
                            {isLookingUpPincode ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Checking
                              </>
                            ) : locationVerified ? (
                              <>
                                <i className="bi bi-check-circle me-1" />
                                Verified
                              </>
                            ) : (
                              "Find location"
                            )}
                          </button>
                        </div>
                        <div className="field-hint">
                          <span>
                            We’ll fill in district and state when available.
                          </span>
                        </div>
                        {locationVerified && (
                          <div className="lookup-success">
                            <i className="bi bi-patch-check-fill me-1" />
                            Location details verified
                          </div>
                        )}
                        {pincodeError && (
                          <div
                            className="small text-danger mt-2"
                            role="alert">
                            {pincodeError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="photo-label">
                      Branch photo{" "}
                      <span>Optional · show the storefront or dining area</span>
                    </div>
                    <ImagePicker
                      field="branchPhoto"
                      title="Add a branch photo"
                      subtitle="JPG, PNG or WebP · up to 1 MB"
                      variant="landscape"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step-content">
                  <div className="section-intro">
                    <span className="section-icon">
                      <i className="bi bi-clock-history" />
                    </span>
                    <div>
                      <h3>Set your weekly schedule</h3>
                      <p>
                        Choose the opening and closing times customers can
                        expect.
                      </p>
                    </div>
                  </div>
                  <div className="hours-list">
                    {formData.operatingHours.map((item, index) => (
                      <div
                        className={`hours-row ${item.closed ? "is-closed" : ""}`}
                        key={item.dayOfWeek}>
                        <div className="hours-day">
                          <span className="day-dot" />
                          <strong>
                            {item.dayOfWeek.charAt(0) +
                              item.dayOfWeek.slice(1).toLowerCase()}
                          </strong>
                        </div>
                        {item.closed ? (
                          <div className="hours-closed-label">
                            <i className="bi bi-moon-stars me-2" />
                            Closed all day
                          </div>
                        ) : (
                          <div className="hours-time-fields">
                            <label
                              className="visually-hidden"
                              htmlFor={`opening-${item.dayOfWeek}`}>
                              Opening time for {item.dayOfWeek}
                            </label>
                            <input
                              id={`opening-${item.dayOfWeek}`}
                              type="time"
                              className="form-control"
                              value={item.openingTime}
                              onChange={(event) =>
                                updateOperatingHour(
                                  index,
                                  "openingTime",
                                  event.target.value,
                                )
                              }
                            />
                            <span className="hours-to">to</span>
                            <label
                              className="visually-hidden"
                              htmlFor={`closing-${item.dayOfWeek}`}>
                              Closing time for {item.dayOfWeek}
                            </label>
                            <input
                              id={`closing-${item.dayOfWeek}`}
                              type="time"
                              className="form-control"
                              value={item.closingTime}
                              onChange={(event) =>
                                updateOperatingHour(
                                  index,
                                  "closingTime",
                                  event.target.value,
                                )
                              }
                            />
                          </div>
                        )}
                        <label className="closed-toggle">
                          <input
                            type="checkbox"
                            checked={item.closed}
                            onChange={(event) =>
                              updateOperatingHour(
                                index,
                                "closed",
                                event.target.checked,
                              )
                            }
                          />
                          <span>Closed</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="hours-note">
                    <i className="bi bi-info-circle-fill" />
                    <span>
                      For now, each day uses one continuous opening period.
                      Overnight hours can be added when we connect the backend.
                    </span>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="form-step-content">
                  <div className="section-intro">
                    <span className="section-icon">
                      <i className="bi bi-person-lines-fill" />
                    </span>
                    <div>
                      <h3>How should people reach you?</h3>
                      <p>
                        Add contact details, then review your setup before
                        saving locally.
                      </p>
                    </div>
                  </div>
                  <div className="contact-group">
                    <h3>
                      <i className="bi bi-shop me-2" />
                      Restaurant contact <span>Optional</span>
                    </h3>
                    <div className="row g-3">
                      {renderTextInput({
                        label: "Phone number",
                        name: "phoneNumber",
                        value: formData.phoneNumber,
                        type: "tel",
                        maxLength: 20,
                        placeholder: "+91 98765 43210",
                        autoComplete: "tel",
                      })}
                      {renderTextInput({
                        label: "Email address",
                        name: "emailAddress",
                        value: formData.emailAddress,
                        type: "email",
                        maxLength: 254,
                        placeholder: "hello@yourrestaurant.com",
                        autoComplete: "email",
                      })}
                      {renderTextInput({
                        label: "Website",
                        name: "website",
                        value: formData.website,
                        type: "url",
                        maxLength: 500,
                        placeholder: "https://yourrestaurant.com",
                        autoComplete: "url",
                      })}
                    </div>
                  </div>
                  <div className="contact-group">
                    <h3>
                      <i className="bi bi-person-badge me-2" />
                      Branch contact <span>Optional</span>
                    </h3>
                    <div className="row g-3">
                      {renderTextInput({
                        label: "Contact person",
                        name: "branchContactName",
                        value: formData.branchContactName,
                        maxLength: 150,
                        placeholder: "Manager or point of contact",
                      })}
                      {renderTextInput({
                        label: "Phone number",
                        name: "branchContactPhone",
                        value: formData.branchContactPhone,
                        type: "tel",
                        maxLength: 20,
                        placeholder: "+91 98765 43210",
                      })}
                      {renderTextInput({
                        label: "Email address",
                        name: "branchContactEmail",
                        value: formData.branchContactEmail,
                        type: "email",
                        maxLength: 254,
                        placeholder: "manager@yourrestaurant.com",
                      })}
                    </div>
                  </div>
                  <div className="review-card">
                    <div className="review-card-heading">
                      <span className="section-icon">
                        <i className="bi bi-clipboard-check" />
                      </span>
                      <div>
                        <h3>Review your details</h3>
                        <p>Go back to any step if you need to make changes.</p>
                      </div>
                    </div>
                    <div className="review-section">
                      <div className="review-title">
                        Restaurant profile{" "}
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}>
                          Edit
                        </button>
                      </div>
                      <div className="review-profile">
                        {formData.restaurantLogo?.dataUrl ? (
                          <img
                            src={formData.restaurantLogo.dataUrl}
                            alt="Restaurant logo"
                          />
                        ) : (
                          <div className="review-avatar">
                            <i className="bi bi-shop" />
                          </div>
                        )}
                        <div>
                          <strong>
                            {formData.restaurantName ||
                              "Restaurant name not entered"}
                          </strong>
                          <p>
                            {formData.cuisineTypes
                              .map(
                                (value) =>
                                  cuisineOptions.find(
                                    (item) => item.value === value,
                                  )?.label || value,
                              )
                              .join(", ") || "No cuisine selected"}
                          </p>
                          {formData.description && (
                            <p>{formData.description}</p>
                          )}
                        </div>
                      </div>
                      {formData.coverPhoto?.dataUrl && (
                        <img
                          className="review-cover"
                          src={formData.coverPhoto.dataUrl}
                          alt="Restaurant cover"
                        />
                      )}
                    </div>
                    <div className="review-section">
                      <div className="review-title">
                        First branch{" "}
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}>
                          Edit
                        </button>
                      </div>
                      <strong>
                        {formData.branchName || "Branch name not entered"}
                      </strong>
                      <p>{reviewAddress || "Address not entered"}</p>
                      {formData.branchPhoto?.dataUrl && (
                        <img
                          className="review-cover"
                          src={formData.branchPhoto.dataUrl}
                          alt="Branch"
                        />
                      )}
                    </div>
                    <div className="review-section">
                      <div className="review-title">
                        Opening hours{" "}
                        <button
                          type="button"
                          onClick={() => setCurrentStep(3)}>
                          Edit
                        </button>
                      </div>
                      <div className="review-hours">
                        {formData.operatingHours.map((item) => (
                          <span key={item.dayOfWeek}>
                            <strong>{item.dayOfWeek.slice(0, 3)}</strong>
                            {item.closed
                              ? "Closed"
                              : `${item.openingTime}–${item.closingTime}`}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="review-section">
                      <div className="review-title">
                        Contact details{" "}
                        <button
                          type="button"
                          onClick={() => setCurrentStep(4)}>
                          Edit
                        </button>
                      </div>
                      <p>
                        {[
                          formData.phoneNumber,
                          formData.emailAddress,
                          formData.website,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "No restaurant contact details added"}
                      </p>
                      <p>
                        {[
                          formData.branchContactName,
                          formData.branchContactPhone,
                          formData.branchContactEmail,
                        ]
                          .filter(Boolean)
                          .join(" · ") || "No branch contact details added"}
                      </p>
                    </div>
                  </div>
                  <div className="local-save-note">
                    <i className="bi bi-shield-lock-fill" />
                    <div>
                      <strong>Local draft only</strong>
                      <p>
                        This step saves your details in this browser for now. It
                        does not create a restaurant in the backend or upload
                        photos to a server.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {validationError && (
                <div
                  className="alert alert-danger onboarding-error mt-4 mb-0"
                  role="alert">
                  <i className="bi bi-exclamation-circle-fill me-2" />
                  {validationError}
                </div>
              )}
              {notice && (
                <div
                  className={`alert ${notice.startsWith("Your onboarding") ? "alert-success" : "alert-warning"} onboarding-notice mt-3 mb-0`}
                  role="status">
                  <i
                    className={`bi ${notice.startsWith("Your onboarding") ? "bi-check-circle-fill" : "bi-info-circle-fill"} me-2`}
                  />
                  {notice}
                </div>
              )}

              <footer className="onboarding-actions">
                <button
                  type="button"
                  className="btn btn-back"
                  onClick={handleBack}>
                  <i className="bi bi-arrow-left me-2" />
                  {currentStep === 1 ? "Cancel setup" : "Back"}
                </button>
                <div className="actions-right">
                  <span className="save-hint">
                    <i className="bi bi-cloud-check me-1" />
                    Auto-saved locally
                  </span>
                  <button
                    type="submit"
                    className="btn btn-continue"
                    disabled={
                      (currentStep === 1 &&
                        (isLoadingMetadata ||
                          Boolean(metadataError) ||
                          cuisineOptions.length === 0)) ||
                      (currentStep === 2 && isLookingUpPincode)
                    }>
                    {currentStep === TOTAL_STEPS ? (
                      <>
                        <i className="bi bi-check2-circle me-2" />
                        Save details
                      </>
                    ) : (
                      <>
                        Continue <i className="bi bi-arrow-right ms-2" />
                      </>
                    )}
                  </button>
                </div>
              </footer>
            </form>
          </section>
        </div>
        <p className="onboarding-footnote">
          <i className="bi bi-lock me-1" /> Your progress is stored in this
          browser on this device until backend integration is added.
        </p>
      </div>
    </main>
  );
};

export default RestaurantOnboarding;
