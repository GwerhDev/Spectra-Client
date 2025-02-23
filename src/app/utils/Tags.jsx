import s from './Tags.module.css';

export const Tags = (props) => {
  const { tag } = props;

  return (
    <span className={s.tag}>
      {
        tag?.name &&
        <p>
          #{tag.name?.toLowerCase().replaceAll(' ', '-').replaceAll('"', '')}
        </p>
      }
    </span>
  )
}
