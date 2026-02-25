# Implementation Plan - Fixing App Breakdown and Adding "More Info" Modal

The app is currently broken because the `isRefreshing` state was accidentally removed while adding the `isModalOpen` state. This caused a `ReferenceError` as `isRefreshing` is still used in the logic.

## Tasks
1. **Fix `App.jsx`**: Restore the `isRefreshing` state variable.
2. **Verify Modal styles**: Ensure the "More Info" modal and button are styled correctly as per requirements.
3. **Test Accessibility**: Verify that the modal opens and closes correctly.

## Proposed Changes

### `App.jsx`
- Add `const [isRefreshing, setIsRefreshing] = useState(false);` back to the component state.
- Ensure the "More Info" button is placed correctly under the "Current Block" section.
- Implementation of the `isModalOpen` state and the modal component itself.

### `App.css`
- Add styles for `.more-info-btn`.
- Add styles for `.modal-overlay`, `.modal-content`, `.modal-header`, `.close-btn`, and `.modal-body`.
- Ensure font sizes and colors match the requirements:
    - Button: small font size, light-gray, pill-shaped border 1px light gray.
    - Modal subtitle: style matches "Current Block" text (Orange, uppercase).
    - Modal text: style matches "Estimated date" text (White, weight 300).
