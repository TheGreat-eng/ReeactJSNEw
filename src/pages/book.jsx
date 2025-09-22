import BookForm from '../components/book/book.form';
import BookTable from '../components/book/book.table';
import { useState, useEffect } from 'react';
import { fetchAllBooksByApi } from '../services/api.service';

const BookPage = () => {
    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false); // ✅ Thêm loading state

    const loadBook = async () => {
        setLoading(true); // ✅ Bắt đầu loading
        try {
            const response = await fetchAllBooksByApi(current, pageSize);
            if (response && response.data) {
                setDataBook(response.data.result);
                setTotal(response.data.meta.total);
                setCurrent(response.data.meta.current);
                setPageSize(response.data.meta.pageSize);
            }
        } catch (error) {
            console.error("Error loading books:", error);
        } finally {
            setLoading(false); // ✅ Kết thúc loading
        }
    };

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    // ✅ Hàm xử lý pagination từ BookTable
    const handlePaginationChange = (newCurrent, newPageSize) => {
        if (newCurrent !== current) {
            setCurrent(newCurrent);
        }
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
            setCurrent(1); // Reset về trang 1 khi thay đổi pageSize
        }
    };

    return (
        <>
            <BookForm loadBook={loadBook} />
            <BookTable
                dataBook={dataBook}
                current={current}
                pageSize={pageSize}
                total={total}
                loading={loading} // ✅ Truyền loading state
                onPaginationChange={handlePaginationChange} // ✅ Truyền callback
                loadBook={loadBook} // ✅ Giữ lại để refresh sau khi delete/update
            />
        </>
    )
}

export default BookPage;
