import React from 'react'
import {useForm} from 'react-hook-form'
import styles from './Form.module.css'

function Form({onSubmit, loading, error}) {
  
  const {register, handleSubmit, formState:{errors}} = useForm()
  console.log(errors)
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label htmlFor="url">URL</label>
      <input className={styles.input}
      {...register('url',{required:true, pattern:/^https?:\/\/.*\..*/})}
        disabled={loading}
        id="url"
        type="text"
      />
      {errors.url && <p className={styles.errorMessage}>Url is not valid.</p>}
    </div>
    <div>
      <label htmlFor="redirect">Redirect</label>
      <input className={styles.input}
      {...register('redirect',{required:true})}
        disabled={loading}
        id="redirect"
        type="text"
      />
      {errors.redirect && <p className={styles.errorMessage}>Required</p>}
    </div>
    <button disabled={loading} type="submit">
      Add
    </button>
    {error && <p className={styles.errorMessage}>{error}</p>}
    {loading && <p>Loading...</p>}
  </form>
  )
}

export default Form