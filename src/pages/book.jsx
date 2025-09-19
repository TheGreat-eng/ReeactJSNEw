import BookForm from '../components/book/book.form';
import BookTable from '../components/book/book.table';
import { useState, useEffect } from 'react';
import { fetchAllBooksByApi } from '../services/api.service';

const BookPage = () => {
    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const loadBook = async () => {
        const response = await fetchAllBooksByApi(current, pageSize);
        if (response && response.data) {
            setDataBook(response.data.result);
            setTotal(response.data.meta.total);
            setCurrent(response.data.meta.current);
            setPageSize(response.data.meta.pageSize);
        }
    };

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    return (
        <>
            <BookForm loadBook={loadBook} />
            <BookTable
                dataBook={dataBook}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadBook={loadBook}
            />
        </>
    )
}

export default BookPage;
