export const storeLocalState = (field, data) => {
  try {
    if (typeof data === "object") {
      localStorage.setItem(field, JSON.stringify(data));
    } else {
      localStorage.setItem(field, data);
    }
  } catch (err) {
    console.log("Error storing in local storage ", err);
  }
};

export const getLocalStateAsStringOrObject = (field, field_is_object = false) => {
  try {
    const data = localStorage.getItem(field);
    if (field_is_object) {
      return data;
    } else {
      return JSON.parse(data);
    }
  } catch (err) {
    console.log("Error fetching from local storage ", err);
    return null;
  }
};

export const getLocalState = (field) => {
  try {
    return localStorage.getItem(field);
  } catch (err) {
    return null;
  }
};

export const getLocalStateObject = (field) => {
  try {
    return localStorage.getItem(field) && JSON.parse(localStorage.getItem(field));
  } catch (err) {
    return null;
  }
};

export const clearLocalState = (field) => {
  try {
    localStorage.removeItem(field);
  } catch (err) {
    console.log("Error clearing in local storage ", err);
  }
};
