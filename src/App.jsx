import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";
import AddJob from "./pages/AddJob";
import { Header } from "./components/Header";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";
import axios from "axios";
import { useEffect } from "react";

//iki sayfadan hangisi çalışırsa farketmez api isteği at useeffect fonk. çalıştır verileri al. bu şekilde tanmlyınca bu const app i add.job ve job.listte tanımlamaya gerek kalmadı tek yerde yaptık.
const App = () => {
  const dispatch = useDispatch();

  //!errorun ekrandaki tekrar dene butonuna basıldığında yeniden api isteği atması için bu getJobs değişkenine atadık ve useeffecteki bilgileri içine taşıdık sonra getjobs değişkenini useffecte tanımldık
  const getJobs = () => {
    //set loadingi çağır çalıştır
    dispatch(setLoading());
    axios
      //api isteği at
      .get("http://localhost:3001/jobs")
      //slicedaki veriyi güncelle
      .then((res) => dispatch(setJobs(res.data)))
      //sliceteki errou güncelle
      .catch((err) => dispatch(setError(err.message)));
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobList getJobs={getJobs} />} />
        <Route path="/add" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

//!getJobs u route prop olarak yolladık error verdiğinde çıkan tekrar dene butonuna basıp tekrar api isteği atmak için bide joblistte de errora prop olarak gönderdik...

//?proje iki sayfadan oluyor bu yuzden state güncellemye gerek yok.iş ekleme sayfasında eklediğimiz veri iş listesine geçtiğimiz zaman sayfa apiye istek atar ve engüncel veri sayfaya düşer. ama eğer bir sayfadan oluşan ve modal açıp kapama olsaydı veya iş eklediğimiz zaman iş listesi yanında bi iş sayısınızı anında gösterir bir yazı durumu olsaydı o zaman dispatchle birlikte veriyi atar statei storu de güncellecek bir action daha yazardık. demiştik ama buradaki useeffect i heriki asyfada ortak kulnasın diye app.jsx e taşıdığımız için tek sayfada değişiklik yapınca yönlendirme yeterli olmuyor yeni bir aksiyon yazıyoruz oda createjob actionu tanımlıyoruz.
