import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { FormArticle } from '../../components/FormArticle';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage';
import Spinner from '../../components/Spinner';
import { apiService } from '../../services/apiService';

const ArticleEdit = memo(() => {
  const { slug } = useParams(); // получает slug из роутера

  const [articleTitle, setArticleTitle] = useState('');
  const [description, setDescription] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [tagList, setTagList] = useState([]);

  const [isLoading, setLoading] = useState(false); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки
  const [errorText, setErrorText] = useState(''); // текст ошибки
  const [isSuccessAlert, setSuccessAlert] = useState(false); // сообщение об успешном изменении

  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

  // обновляет данные в полях формы
  const updateFormData = () => {
    apiService.getAarticleFull(slug, token).then((res) => {
      setTagList(res.article.tagList);
      setDescription(res.article.description);
      setArticleTitle(res.article.title);
      setArticleBody(res.article.body);
    });
  };

  useEffect(() => {
    updateFormData();
  }, []);

  // обновляет статью
  const articleUpdate = (val) => {
    const modifiedArticle = {
      title: val.title.trim(),
      description: val.description.trim(),
      body: val.body,
      // любое положительное значение + удалит пробелы по краям
      tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
    };

    setLoading(true);

    apiService
      .putArticleUpdate(slug, modifiedArticle, token)
      .then((res) => {
        if (res.article) {
          setLoading(false);
          setSuccessAlert(true);

          updateFormData(); // обновляет данные в форме
        }
        if (res.errors) {
          setLoading(false);
          setIsError(true);
          const errorStr = `${res.errors.error.status} ${res.errors.message}`;
          setErrorText(errorStr);
        }
      })
      .catch(() => {
        setLoading(false);
        setIsError(true);
        setErrorText('Data loading error. Please try reloading the page or try again later.');
      });
  };

  // при закрытии сообщения об успехе или ошибке
  const atCloseAletr = () => {
    setSuccessAlert(false);
    setIsError(false);
  };

  const form = !isLoading && !isError && !isSuccessAlert && (
    <FormArticle
      title="Edit article"
      tagList={tagList}
      description={description}
      articleTitle={articleTitle}
      articleBody={articleBody}
      transferData={articleUpdate}
    />
  );

  const loader = isLoading && <Spinner />;

  const errorAlert = isError && <ErrorMessage description={errorText} closingAlert={atCloseAletr} />;

  const successAlert = isSuccessAlert && (
    <SuccessMessage description="Article update successfully!" closingAlert={atCloseAletr} closable={true} />
  );
  return (
    <>
      {successAlert}
      {errorAlert}
      {form}
      {loader}
    </>
  );
});

export { ArticleEdit };
