import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = ({ getJobs }) => {
  //stora abone ol
  const jobState = useSelector((store) => store.jobReducer);

  // console.log(store);
  //!bunları buradan alıp app.jsx e tanıttık her iki sayfadan da erişilebilsin inputlara tıkladığımızda autocomplete yanı otomatik tamamla çalışsın.
  //aksiyonları çalıştırmak için
  // const dispatch = useDispatch();

  // //!errorun ekrandaki tekrar dene butonuna basıldığında yeniden api isteği atması için bu getJobs değişkenine atadık ve useeffecteki bilgileri içine taşıdık sonra getjobs değişkenini useffecte tanımldık
  // const getJobs = () => {
  //   //set loadingi çağır çalıştır
  //   dispatch(setLoading());
  //   axios
  //     //api isteği at
  //     .get("http://localhost:3001/jobs")
  //     //slicedaki veriyi güncelle
  //     .then((res) => dispatch(setJobs(res.data)))
  //     //sliceteki errou güncelle
  //     .catch((err) => dispatch(setError(err.message)));
  // };

  // useEffect(() => {
  //   getJobs();
  // }, []);

  return (
    <div className="list-page">
      <Filter />
      {/* 
       1)yüklenme devam ediyorsa ekrana loadeer bas
       2) yüklenme bittiyse ve hata varsa ekrana hatayı ve tekrar dene butonu bas
       3) yüklenme bittiyse ve hata yoksa ekrana kartları bas
       */}
      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} retry={getJobs} />
      ) : (
        <div className="job-list">
          {" "}
          {jobState.jobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
