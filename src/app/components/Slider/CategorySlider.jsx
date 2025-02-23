import { Slider } from './Slider';

const CategorySlider = (props) => {
  const { data, dbCategories } = props;

  return (
    <>
      {
        dbCategories?.map((category, index) => {
          return (
            data[index]?.length &&
            <Slider title={category.name} data={data[index]} idCategory={category.id} id={`s${category.id}${index}`} key={category.id} />
          )
        })
      }
    </>
  )
};

export default CategorySlider;