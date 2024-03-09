import { v4 } from "uuid";
import { statusOptions, typeOptions } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";

const AddJob = () => {
  //buurada stora abone olmamızın sebebi addjob.jsx sayfasında stora eklenen verileri bilmek istiyorum.bunu yapmasak consolda jobs boş dizi olarak gelirdi şimdi dolu dizi olarak geliyor.
  const jobState = useSelector((store) => store.jobReducer);
  // console.log(store);

  //kurulumlar
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("çalıştı");

    //inputlardaki verilere eriş al birdizioluştur ve diziyi objeye çevir
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());
    // console.log(newJobData);
    //tarih ve id ekle
    newJobData.date = new Date().toLocaleDateString();
    newJobData.id = v4();
    // console.log(newJobData);

    //apiye veriyi ekle
    axios
      .post("http://localhost:3001/jobs", newJobData)
      //başarılı olma durumunda
      .then(() => {
        toast.success("Yeni iş eklendi");
        //storada ekle
        dispatch(createJob(newJobData));
        //anasayfaya yönlendir
        navigate("/");
      })
      //başarısız olma durumunda
      .catch(() => {
        toast.error("Ekleme işleminde sorun oluştu");
      });
    //?proje iki sayfadan oluyor bu yuzden state güncellemye gerek yok.iş ekleme sayfasında eklediğimiz veri iş listesine geçtiğimiz zaman sayfa apiye istek atar ve engüncel veri sayfaya düşer. ama eğer bir sayfadan oluşan ve modal açıp kapama olsaydı veya iş eklediğimiz zaman iş listesi yanında bi iş sayısınızı anında gösterir bir yazı durumu olsaydı o zaman dispatchle birlikte veriyi atar statei storu de güncellecek bir action daha yazardık. demiştik ama buradaki useeffect i heriki asyfada ortak kulnasın diye app.jsx e taşıdığımız için tek sayfada değişiklik yapınca yönlendirme yeterli olmuyor yeni bir aksiyon yazıyoruz oda createjob actionu tanımlıyoruz.
  };

  //dizideki değerleri aynı olan elamanları kaldır
  const removeDuplicates = (key) => {
    //1) console.log(jobState?.jobs); ile consolda görğnen iş dizisini sadece pozisyonlardan oluşan bir dizi olarak tanımla..
    const arr = jobState.jobs.map((job) => job[key]);

    //dizi içerisinde tekrar eden elemanı kaldır
    //!dizi içerisinde indexof metoduyla itemımızdan varsa burada sırasını bul
    const filtred = arr.filter((item, index) => arr.indexOf(item) === index);

    return filtred;
  };

  // console.log(removeDuplicates("position"));
  // console.log(removeDuplicates("location"));

  // console.log(jobState?.jobs);

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position-list" name="position" type="text" required />
            <datalist id="position-list">
              {/* {jobState?.jobs.map((job) => (
                <option key={job.id} value={job.position} />
              ))} bçyleyken sonra düzenledik */}
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="company-list" name="company" type="text" required />
            <datalist id="company-list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Lokasyon</label>
            <input list="location-list" name="location" type="text" required />
            <datalist id="location-list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button id="special-button">
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Submit</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
