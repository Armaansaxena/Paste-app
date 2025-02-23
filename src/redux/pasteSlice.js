import { createSlice } from '@reduxjs/toolkit'
import  { toast } from 'react-hot-toast';
const initialState = {
    pastes: localStorage.getItem('pastes')
        ? JSON.parse(localStorage.getItem('pastes'))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      // add a check -> Paste already exists -> exist wala case

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully")
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully")
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      
      if (index >= 0) {
        state.pastes.splice(index, 1); // Remove item from array
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Update local storage
        toast.success("Paste Deleted successfully");
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer
