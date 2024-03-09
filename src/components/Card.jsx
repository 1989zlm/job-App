import DelButton from "./DelButton";
import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import axios from "axios";
import { deleteJob } from "../redux/slices/jobSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Card = ({ job }) => {
  const dispatch = useDispatch();

  const colors = {
    Mülakat: "green",
    Reddedildi: "red",
    "Devam Ediyor": "orange",
  };
  // const status = "Mülakat";

  // console.log(colors["Reddedildi"]);

  const handleDelete = () => {
    if (confirm("silmek istediğinizden eminmisiniz ?")) {
      // api isteği at
      axios
        .delete(`http://localhost:3001/jobs/${job.id}`)
        //başarılı olursa stordan kaldır(.then(() => {});sadece bukadar yapınca handledelete eklenmediği için apiden silinir ama ekrandan gitmezbu yuzden silme butonlarına handleclıck atadık.sonra silindi ancak sayfayı yenileyince yeniden geldi.kullanıcının sayfayı yenilemesine gerek bırakmadan veriyi tuttuuğumuz slice ve stordan da silmeliyiz.yani statei güncellemeliyiz.slice'a geçiyoruz deletejob action u yazıyoruz..)
        //başarıı olursa stordan kaldır
        .then(() => {
          dispatch(deleteJob(job.id));
          toast.success("İş başarıyla kaldırıldı");
        }) //to do başarısız olursa uyarı ver
        .catch((err) => {
          toast.error("Üzgünüz bir hata oluştu");
        });
    }
  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
            {/* şirket ismi dizi olarak geliyor o yuzden ismin ilk harfi demiş olduk burada */}
          </div>
          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>
        <div className="right">
          <DelButton handleDelete={handleDelete} />
        </div>
      </div>

      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{new Date(job.date).toLocaleDateString("tr")}</p>
        </div>
        <div className="status">
          <p
            style={{
              background: colors[job.status],
            }}
          >
            {job.status}
          </p>
          {/* <p>
            {{
              background:
                job.status === "Mülakat"
                  ? "green"
                  : job.status === "Devam Ediyor"
                  ? "orange"
                  : "red",
            }}
          </p> bu şekilde de yapabilirdik yukarıda const olarak tanımladık */}
        </div>
      </div>
    </div>
  );
};

export default Card;
