const TextInput=({ isVisible }:{isVisible:boolean}) => {
    return (
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        <input type="text" placeholder="Enter text" />
      </div>
    )
  }

  export default TextInput