import ManageMenu from "../components/manageMenu";


const ManageScreen = {
    after_render: () => {},
    render: () => {
        return `
        <div class="manage">
            ${ManageMenu.render({selected:'manage'})}
            <div class="manage-content">
                <h1>Статистика</h1>
                <div>
                    Основная информация и статистика будут здесь
                </div>
            </div>
        </div>
        `
    }
}

export default ManageScreen;