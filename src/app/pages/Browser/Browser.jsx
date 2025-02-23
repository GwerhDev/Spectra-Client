import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { resetIdYT, resetOption } from "../../../middlewares/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getMedia, resetMedia } from "../../../middlewares/redux/actions/content";
import { getUserToken } from "../../../middlewares/helpers";
import { getFavorites } from "../../../middlewares/redux/actions/account";
import { Slider } from "../../components/Slider/Slider";
import { Visor } from "../../components/Visor/Visor";
import { Footer } from "../../utils/Footer";
import CategorySlider from "../../components/Slider/CategorySlider";

const Browser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = getUserToken();
  const contentList = useSelector((state) => state.contentList);
  const currentUser = useSelector((state) => state.currentUser);
  const dbCategories = useSelector((state) => state.dbCategories);
  const mediaByCategory = useSelector((state) => state.mediaByCategory);

  useEffect(() => {
    dispatch(resetOption())
  }, [dispatch])

  useEffect(() => {
    !(userToken?.length && !currentUser) ? null : navigate(`/auth?token=${userToken}`);
  }, [currentUser, userToken, navigate])

  useEffect(() => {
    dispatch(getMedia());
    dispatch(resetIdYT());
    dispatch(resetMedia());
    dispatch(getFavorites());
    dispatch(getCategories());
  }, [dispatch, currentUser]);

  return (
    <main>
      <Visor />
      <Slider title={"Contenido"} data={contentList} idCategory={-1} id={`s${-1}`} key={`s${-1}`} />
      <CategorySlider data={mediaByCategory} dbCategories={dbCategories} />
      <Footer />
    </main>
  );
};

export default Browser;
