export function logout(navigate) {
  return (
    localStorage.clear(),
    navigate('/browser'),
    window.location.reload()
  )
}