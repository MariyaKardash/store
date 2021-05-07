const ManageMenu = {
    render: (props) => {
        return `
        <div class="manage-menu">
            <ul>
                <li class="${props.selected === 'manage'?'selected':''}">
                    <a href="/#/manage">Статистика</a>
                </li>
                <li class="${props.selected === 'orders'?'selected':''}">
                    <a href="/#/orderlist">Заказы</a>
                </li>
                <li class="${props.selected === 'products'?'selected':''}">
                    <a href="/#/productlist">Товары</a>
                </li>
            </ul>
        </div>
        `
    }
}

export default ManageMenu;