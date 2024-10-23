import { Table } from "antd";
import PropTypes from "prop-types";

const TableList = ({ dataSource, columns, title }) => {
  return (
    <div className="w-[90vw]">
      <div className="rounded-[12px] px-[15px] bg-white">
        <h3 className="my-[10px] outfit-small text-[20px]">{title}</h3>
        <div className="w-full overflow-x-auto">
          <Table
            scroll={{ x: "max-content" }}
            style={{
              overflowX: "auto",
            }}
            dataSource={dataSource}
            columns={columns}
            rowKey="key"
          />
        </div>
      </div>
    </div>
  );
};

TableList.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
};

export default TableList;
