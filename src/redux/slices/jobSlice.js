import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    jobs: [],
    mainJobs: [],
    isLoading: false,
    error: null,
}
const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        setJobs: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.jobs = action.payload;
            state.mainJobs = action.payload;
        },
        deleteJob: (state, action) => {//actionun payloadıyla edindiğimiz id bilgisindan yola çıkarak ile silme işlemi yapalım toolkitte stora direk erişim ve müdahale izni olduğu için silme işlemlerinde slice kullanabiliriz. bu yüzden önce elemanın sırasını findındex ile bulmalıyız. 
            //!eğerki state içerisindeki jobs değerini findIndex ile gezdiğimiz zaman her bir elemana item diyecek olursak,itemın id değeri eşitse actionun payloadıyla aldığımız id değerine silinecek olan elemanın sırasını bul
            const index = state.jobs.findIndex((i) => i.id === action.payload);//burada action.payload.id demedik çünkü payloadla beraber zaten id geliyor idnin idsini sil demiş oluruz oyuzden action.payload dedik.

            //elemanı diziden kaldır
            state.jobs.splice(index, 1);
        },
        createJob: (state, action) => {
            state.jobs.push(action.payload);
        },
        //aratılan şirket ismine göre filtrele
        filterBySearch: (state, action) => {
            console.log('Aksiyon çalıştı', action.payload)

            //aratılan kelimeyi buulmak için
            const query = action.payload?.text?.toLowerCase();

            //şirket isimlerini filtreleme yap
            //!statein içindeki şirketleri filtlere devamında ise herbir işe iteım i si de, herbir iş için işin değeri üzerinden git (değeri burada company)i.company şirket değeri eğerki içeriyorsa arattığım kelimeyi o zaman filtreden geçebilecek. ve state.jobs a değer olarak ata de state güncelle 
            state.jobs = state.mainJobs.filter((i) =>
                i[action.payload.name].toLowerCase().includes(query) || i.position.toLowerCase().includes(query)
            );
            // //filtrelenmiş değerin yeni adı state job olsun.uzun hali
            // state.jobs = filtred
        },

        // sıralama optionu için yazılan kod.tarih a-z z-a ya
        sortJobs: (state, action) => {
            //! ALFABETİK SIRALMA YAPMAK İÇİN       
            switch (action.payload) {
                case 'a-z':
                    state.jobs.sort((a, b) => a.company.localeCompare(b.compnay));
                    break;

                case 'z-a':
                    state.jobs.sort((a, b) => b.company.localeCompare(a.company));
                    break;
                //!SAYISAL SIRALAMA YAPMAK İÇİN 
                case 'En Yeni':
                    //new date ekledikki stringi sayısal değere çevirelim
                    state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date))
                    break;

                case 'En Eski': state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date))
                    break;

                default:
                    break;
            }
        }
    }
})

//aksiyonları export et
export const { setError, setJobs, setLoading, deleteJob, createJob, filterBySearch, sortJobs } = jobSlice.actions;

//reducerları export et
export default jobSlice.reducer;