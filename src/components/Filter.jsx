import { useDispatch } from "react-redux";
import { filterBySearch, sortJobs } from "../redux/slices/jobSlice";
import { sortOptions, statusOptions, typeOptions } from "./../constants/index";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Filter = () => {
  //debounce işlemi için yazılan fonk.1.yöntem
  const [text, setText] = useState();
  const dispatch = useDispatch();
  //ebounc için ikinci yöntem
  const debounceText = useDebounce(text, 500);

  // her tuş vuruşunda filtreleme yapmak düşük donanımlı cihazlarda kasmalara ve donmalara sebep olabileceğinden filtreme işlemini kullancı yazma işini bıraktığı anda yapmalıyız. Bu işleme Debounce denir. Ardışık olarak udemifgerçekleşen fonksiyon çağırma işlemlerinde fonksiyonun kısa bir zaman aralığında çağrılığını görmezsden gelir.
  useEffect(() => {
    // bir sayaç başlat ve işlemi sayaç durduğunda yap
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ text, name: "company" }));
      // console.log("çalıştı");
    }, 500);

    // eğerki süre bitmeden tekrardan useEffect çalışırsa önceki sayacın çalışmasını durdur
    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket ismine göre arama</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>
        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden>Seçiniz</option>
            {typeOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden>Seçiniz</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="reset" id="special-button">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Filtreleri Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};
console.log;
export default Filter;
